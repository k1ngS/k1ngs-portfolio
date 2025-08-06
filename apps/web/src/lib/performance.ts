/**
 * Performance monitoring utilities
 * Provides web vitals and performance metrics tracking
 */

import { env } from "./env";

// Web Vitals types
interface Metric {
	name: string;
	value: number;
	delta: number;
	id: string;
	entries: PerformanceEntry[];
}

interface WebVitalsData {
	CLS?: number;
	FID?: number;
	FCP?: number;
	LCP?: number;
	TTFB?: number;
}

class PerformanceMonitor {
	private metrics: WebVitalsData = {};
	private observers: PerformanceObserver[] = [];

	constructor() {
		if (typeof window !== "undefined" && env.nodeEnv === "production") {
			this.initWebVitals();
			this.initResourceTiming();
			this.initNavigationTiming();
		}
	}

	private initWebVitals() {
		// Import web-vitals dynamically
		import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(this.onVitalMetric.bind(this));
			getFID(this.onVitalMetric.bind(this));
			getFCP(this.onVitalMetric.bind(this));
			getLCP(this.onVitalMetric.bind(this));
			getTTFB(this.onVitalMetric.bind(this));
		}).catch((error) => {
			console.warn("Failed to load web-vitals:", error);
		});
	}

	private onVitalMetric(metric: Metric) {
		this.metrics[metric.name as keyof WebVitalsData] = metric.value;
		
		// Log to console in development
		if (env.nodeEnv === "development") {
			console.log(`${metric.name}: ${metric.value}`);
		}

		// Send to analytics service
		this.sendToAnalytics(metric);
	}

	private initResourceTiming() {
		if (!("PerformanceObserver" in window)) return;

		const observer = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry) => {
				if (entry.entryType === "resource") {
					this.trackResourceTiming(entry as PerformanceResourceTiming);
				}
			});
		});

		observer.observe({ entryTypes: ["resource"] });
		this.observers.push(observer);
	}

	private initNavigationTiming() {
		if (!("PerformanceObserver" in window)) return;

		const observer = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry) => {
				if (entry.entryType === "navigation") {
					this.trackNavigationTiming(entry as PerformanceNavigationTiming);
				}
			});
		});

		observer.observe({ entryTypes: ["navigation"] });
		this.observers.push(observer);
	}

	private trackResourceTiming(entry: PerformanceResourceTiming) {
		// Track slow resources
		if (entry.duration > 1000) {
			console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
			
			// In production, you might want to send this to your analytics
			if (env.nodeEnv === "production") {
				this.sendToAnalytics({
					name: "slow_resource",
					value: entry.duration,
					resource: entry.name,
				});
			}
		}
	}

	private trackNavigationTiming(entry: PerformanceNavigationTiming) {
		const timing = {
			dns: entry.domainLookupEnd - entry.domainLookupStart,
			tcp: entry.connectEnd - entry.connectStart,
			ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
			ttfb: entry.responseStart - entry.requestStart,
			download: entry.responseEnd - entry.responseStart,
			dom: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
			total: entry.loadEventEnd - entry.navigationStart,
		};

		if (env.nodeEnv === "development") {
			console.table(timing);
		}

		// Send navigation timing to analytics
		if (env.nodeEnv === "production") {
			this.sendToAnalytics({
				name: "navigation_timing",
				value: timing.total,
				timing,
			});
		}
	}

	private sendToAnalytics(data: any) {
		// Google Analytics 4
		if (env.googleAnalyticsId && typeof gtag !== "undefined") {
			gtag("event", data.name, {
				custom_parameter_1: data.value,
				...data,
			});
		}

		// Send to your custom analytics endpoint
		if (env.nodeEnv === "production") {
			fetch(`${env.serverUrl}/api/analytics`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "performance",
					data,
					timestamp: Date.now(),
					userAgent: navigator.userAgent,
					url: window.location.href,
				}),
			}).catch((error) => {
				console.warn("Failed to send analytics:", error);
			});
		}
	}

	// Public methods
	public getMetrics(): WebVitalsData {
		return { ...this.metrics };
	}

	public measureFunction<T>(name: string, fn: () => T): T {
		const start = performance.now();
		const result = fn();
		const duration = performance.now() - start;

		if (env.nodeEnv === "development") {
			console.log(`${name} took ${duration.toFixed(2)}ms`);
		}

		// Track functions that take longer than 16ms (60fps threshold)
		if (duration > 16) {
			this.sendToAnalytics({
				name: "slow_function",
				value: duration,
				functionName: name,
			});
		}

		return result;
	}

	public async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
		const start = performance.now();
		const result = await fn();
		const duration = performance.now() - start;

		if (env.nodeEnv === "development") {
			console.log(`${name} took ${duration.toFixed(2)}ms`);
		}

		// Track async functions that take longer than 100ms
		if (duration > 100) {
			this.sendToAnalytics({
				name: "slow_async_function",
				value: duration,
				functionName: name,
			});
		}

		return result;
	}

	public trackUserInteraction(action: string, element?: string) {
		this.sendToAnalytics({
			name: "user_interaction",
			action,
			element,
			timestamp: Date.now(),
		});
	}

	public trackError(error: Error, context?: string) {
		this.sendToAnalytics({
			name: "javascript_error",
			message: error.message,
			stack: error.stack,
			context,
			timestamp: Date.now(),
		});
	}

	public dispose() {
		this.observers.forEach((observer) => observer.disconnect());
		this.observers = [];
	}
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for performance monitoring
export function usePerformanceMonitor() {
	return {
		measureFunction: performanceMonitor.measureFunction.bind(performanceMonitor),
		measureAsyncFunction: performanceMonitor.measureAsyncFunction.bind(performanceMonitor),
		trackUserInteraction: performanceMonitor.trackUserInteraction.bind(performanceMonitor),
		trackError: performanceMonitor.trackError.bind(performanceMonitor),
		getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
	};
}

// Utility functions
export function trackPageView(page: string) {
	performanceMonitor.trackUserInteraction("page_view", page);
}

export function trackButtonClick(buttonName: string) {
	performanceMonitor.trackUserInteraction("button_click", buttonName);
}

export function trackFormSubmit(formName: string) {
	performanceMonitor.trackUserInteraction("form_submit", formName);
}

// Export for cleanup
export default performanceMonitor;