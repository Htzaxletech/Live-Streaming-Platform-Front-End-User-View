/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import LoadingIndicator from "@components/ui/LoadingIndicator";

const MemoizedScrollToTop = lazy(
	() => import("@components/shared/ScrollToTop")
);
const PrivateRoute = lazy(() => import("@components/shared/PrivateRoute"));
const DashboardRootPage = lazy(() => import("@pages/dashboard/RootPage"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const Channel = lazy(() => import("@pages/dashboard/channel/Channel"));
const StreamPage = lazy(() => import("@pages/dashboard/stream/StreamPage"));
const StreamManager = lazy(() => import("@pages/dashboard/StreamManager"));

const dashboardRoutes = {
	path: "/dashboard",
	element: (
		<Suspense fallback={<LoadingIndicator />}>
			<MemoizedScrollToTop />
			<PrivateRoute element={<DashboardRootPage />} />
		</Suspense>
	),
	errorElement: (
		<Suspense fallback={<LoadingIndicator />}>
			<ErrorPage />
		</Suspense>
	),
	children: [
		{
			path: "/dashboard/:id",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<StreamManager />
				</Suspense>
			),
		},
		{
			path: "/dashboard/setting",
			children: [
				{
					path: "/dashboard/setting/stream",
					element: (
						<Suspense fallback={<LoadingIndicator />}>
							<StreamPage />
						</Suspense>
					),
				},
				{
					path: "/dashboard/setting/channel",
					element: (
						<Suspense fallback={<LoadingIndicator />}>
							<Channel />
						</Suspense>
					),
				},
			],
		},
	],
};

export default dashboardRoutes;
