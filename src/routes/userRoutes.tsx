import { lazy, Suspense } from "react";
import LoadingIndicator from "@components/ui/LoadingIndicator";
import TestingComponents from "@pages/TestingComponents";
import ProfilePage from "@pages/ProfilePage";

const HomePage = lazy(() => import("@pages/HomePage"));
const RootPage = lazy(() => import("@pages/RootPage"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const DirectoryPage = lazy(() => import("@pages/DirectoryPage"));
const FollowingPage = lazy(() => import("@pages/FollowingPage"));
const ChannelPage = lazy(() => import("@pages/ChannelPage"));
const LiveStreamPage = lazy(() => import("@pages/LiveStreamPage"));
const CategoryPage = lazy(() => import("@pages/CategoryPage"));
const DirectoryCategoryPage = lazy(
	() => import("@pages/DirectoryCategoryPage")
);

const userRoutes = {
	path: "/",
	element: (
		<Suspense fallback={<LoadingIndicator />}>
			<RootPage />
		</Suspense>
	),
	errorElement: (
		<Suspense fallback={<LoadingIndicator />}>
			<ErrorPage />
		</Suspense>
	),
	children: [
		{
			path: "",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<HomePage />
				</Suspense>
			),
		},
		{
			path: "/directory",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<DirectoryPage />
				</Suspense>
			),
		},
		{
			path: "/directory/:dirCategoryName",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<DirectoryCategoryPage to={""} imgUrl={""} name={""} />
				</Suspense>
			),
		},
		{
			path: "/directory/category/:categoryName",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<CategoryPage />
				</Suspense>
			),
		},
		{
			path: "/following",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<FollowingPage />
				</Suspense>
			),
		},
		{
			path: "/profile",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<ProfilePage />
				</Suspense>
			),
		},
		{
			path: "/:id",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<LiveStreamPage />
				</Suspense>
			),
		},
		{
			path: "/channel/:id",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<ChannelPage />
				</Suspense>
			),
		},
		{
			path: "/testing",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<TestingComponents />
				</Suspense>
			),
		},
	],
};

export default userRoutes;
