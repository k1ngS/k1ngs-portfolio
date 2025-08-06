import { useCallback, useEffect, useRef, useState } from "react";
import { apiService, formatApiError } from "../services/api";

export const useApi = <T>(
	apiCall: () => Promise<{ data: T }>,
	dependencies: any[] = [],
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const apiCallRef = useRef(apiCall);

	useEffect(() => {
		apiCallRef.current = apiCall;
	}, [apiCall]);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await apiCallRef.current();
			setData(response.data);
		} catch (err) {
			setError(formatApiError(err));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, dependencies);

	const refetch = useCallback(() => {
		fetchData();
	}, [fetchData]);

	return { data, loading, error, refetch };
};

export const useAbout = () => {
	return useApi(() => apiService.about.getAll(), []);
};

export const useAboutStats = () => {
	return useApi(() => apiService.about.getStats(), []);
};

export const useSkills = () => {
	return useApi(() => apiService.skills.getAll(), []);
};

export const useSkillsStats = () => {
	return useApi(() => apiService.skills.getStats(), []);
};

export const useSkillsByCategory = (category: string) => {
	return useApi(() => apiService.skills.getByCategory(category), [category]);
};

export const useProjects = (params: Record<string, any> = {}) => {
	const [stableParams, setStableParams] = useState(params);
	const paramsRef = useRef(JSON.stringify(params));

	useEffect(() => {
		const currentParamsStr = JSON.stringify(params);
		if (currentParamsStr !== paramsRef.current) {
			paramsRef.current = currentParamsStr;
			setStableParams(params);
		}
	}, [params]);

	return useApi(
		() => apiService.projects.getAll(stableParams),
		[JSON.stringify(stableParams)],
	);
};

export const useProject = (id: string) => {
	return useApi(() => apiService.projects.getById(id), [id]);
};

export const useFeaturedProjects = () => {
	return useApi(() => apiService.projects.getFeatured(), []);
};

export const useProjectsStats = () => {
	return useApi(() => apiService.projects.getStats(), []);
};

export const usePublicSettings = (formatted = true) => {
	return useApi(() => apiService.settings.getPublic(formatted), [formatted]);
};

export const useSetting = (key: string) => {
	return useApi(() => apiService.settings.getByKey(key), [key]);
};
