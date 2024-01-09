import DashboardRootPage from "@pages/dashboard/RootPage";
import ErrorPage from "@pages/ErrorPage";
import LoadingIndicator from "@components/ui/LoadingIndicator";
import { Suspense } from "react";
import Channel from "@pages/dashboard/channel/Channel";
import StreamPage from "@pages/dashboard/stream/StreamPage";
import StreamManager from "@pages/dashboard/StreamManager";


export const dashboardRoutes = {
	path: "/dashboard",
	element: <DashboardRootPage />,
	errorElement: <ErrorPage />,
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
