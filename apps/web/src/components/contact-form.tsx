import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

interface ContactFormProps {
	onSuccess?: () => void;
	embedded?: boolean;
}

export default function ContactForm({ onSuccess, embedded = false }: ContactFormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			subject: "",
			message: "",
		} as ContactFormData,
		onSubmit: async ({ value }) => {
			setIsSubmitting(true);
			
			try {
				// Simulate API call - replace with actual contact API
				await new Promise(resolve => setTimeout(resolve, 1000));
				
				// Here you would normally send the data to your backend
				console.log("Contact form data:", value);
				
				setIsSubmitted(true);
				toast.success("Message sent successfully!");
				
				// Reset form after success
				setTimeout(() => {
					setIsSubmitted(false);
					form.reset();
					onSuccess?.();
				}, 2000);
				
			} catch (error) {
				console.error("Contact form error:", error);
				toast.error("Failed to send message. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
		},
		validatorAdapter: zodValidator,
	});

	if (isSubmitted) {
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				className={`flex flex-col items-center justify-center ${embedded ? "py-8" : "min-h-96"}`}
			>
				<CheckCircle className="w-16 h-16 text-green-500 mb-4" />
				<h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
				<p className="text-gray-400 text-center">
					Thank you for reaching out. I'll get back to you soon!
				</p>
			</motion.div>
		);
	}

	const FormContent = () => (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			{/* Name Field */}
			<form.Field
				name="name"
				validators={{
					onChange: contactFormSchema.shape.name,
				}}
			>
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor={field.name} className="text-sm font-medium">
							Name *
						</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Your full name"
							className={`${
								field.state.meta.errors.length > 0
									? "border-red-500 focus:border-red-500"
									: ""
							}`}
						/>
						{field.state.meta.errors.length > 0 && (
							<div className="flex items-center gap-1 text-red-500 text-sm">
								<AlertCircle className="w-4 h-4" />
								{field.state.meta.errors[0]}
							</div>
						)}
					</div>
				)}
			</form.Field>

			{/* Email Field */}
			<form.Field
				name="email"
				validators={{
					onChange: contactFormSchema.shape.email,
				}}
			>
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor={field.name} className="text-sm font-medium">
							Email *
						</Label>
						<Input
							id={field.name}
							name={field.name}
							type="email"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="your.email@example.com"
							className={`${
								field.state.meta.errors.length > 0
									? "border-red-500 focus:border-red-500"
									: ""
							}`}
						/>
						{field.state.meta.errors.length > 0 && (
							<div className="flex items-center gap-1 text-red-500 text-sm">
								<AlertCircle className="w-4 h-4" />
								{field.state.meta.errors[0]}
							</div>
						)}
					</div>
				)}
			</form.Field>

			{/* Subject Field */}
			<form.Field
				name="subject"
				validators={{
					onChange: contactFormSchema.shape.subject,
				}}
			>
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor={field.name} className="text-sm font-medium">
							Subject
						</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="What's this about?"
							className={`${
								field.state.meta.errors.length > 0
									? "border-red-500 focus:border-red-500"
									: ""
							}`}
						/>
						{field.state.meta.errors.length > 0 && (
							<div className="flex items-center gap-1 text-red-500 text-sm">
								<AlertCircle className="w-4 h-4" />
								{field.state.meta.errors[0]}
							</div>
						)}
					</div>
				)}
			</form.Field>

			{/* Message Field */}
			<form.Field
				name="message"
				validators={{
					onChange: contactFormSchema.shape.message,
				}}
			>
				{(field) => (
					<div className="space-y-2">
						<Label htmlFor={field.name} className="text-sm font-medium">
							Message *
						</Label>
						<textarea
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Tell me about your project or just say hello!"
							rows={5}
							className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
								field.state.meta.errors.length > 0
									? "border-red-500 focus:border-red-500"
									: ""
							}`}
						/>
						{field.state.meta.errors.length > 0 && (
							<div className="flex items-center gap-1 text-red-500 text-sm">
								<AlertCircle className="w-4 h-4" />
								{field.state.meta.errors[0]}
							</div>
						)}
					</div>
				)}
			</form.Field>

			{/* Submit Button */}
			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<Button
						type="submit"
						disabled={!canSubmit || isSubmitting}
						className="w-full"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Sending...
							</>
						) : (
							<>
								<Send className="w-4 h-4 mr-2" />
								Send Message
							</>
						)}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);

	if (embedded) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<FormContent />
			</motion.div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="max-w-md mx-auto"
		>
			<Card>
				<CardHeader>
					<CardTitle>Get In Touch</CardTitle>
					<CardDescription>
						I'd love to hear about your project or just chat about technology!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<FormContent />
				</CardContent>
			</Card>
		</motion.div>
	);
}