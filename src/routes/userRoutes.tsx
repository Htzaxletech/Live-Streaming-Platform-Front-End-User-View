/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import LoadingIndicator from "@components/ui/LoadingIndicator";

const MemoizedScrollToTop = lazy(
	() => import("@components/shared/ScrollToTop")
);

const PrivateRoute = lazy(() => import("@components/shared/PrivateRoute"));
const HomePage = lazy(() => import("@pages/HomePage"));
const RootPage = lazy(() => import("@pages/RootPage"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const DirectoryPage = lazy(() => import("@pages/browse/DirectoryPage"));
const FollowingPage = lazy(() => import("@pages/FollowingPage"));
const ChannelPage = lazy(() => import("@pages/ChannelPage"));
const LiveStreamPage = lazy(() => import("@pages/LiveStreamPage"));
const CategoryPage = lazy(() => import("@pages/category/CategoryPage"));
const DirectoryCategoryPage = lazy(
	() => import("@pages/browse/DirectoryCategoryPage")
);
const ProfilePage = lazy(() => import("@pages/profile/ProfilePage"));
const SearchPage = lazy(() => import("@pages/search/SearchPage"));
const TestingComponents = lazy(() => import("@pages/TestingComponents"));

const userRoutes = {
	path: "/",
	element: (
		<Suspense fallback={<LoadingIndicator />}>
			<MemoizedScrollToTop />
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
					<DirectoryCategoryPage />
				</Suspense>
			),
		},
		// {
		// 	path: "/directory/category/:categoryName",
		// 	element: (
		// 		<Suspense fallback={<LoadingIndicator />}>
		// 			<CategoryPage />
		// 		</Suspense>
		// 	),
		// },
		{
			path: "/directory/category/:categoryID",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<CategoryPage />
				</Suspense>
			),
		},
		{
			path: "/search/:searchKeyword",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<SearchPage />
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
			path: "/profile/:channelId",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<PrivateRoute element={<ProfilePage />} />
				</Suspense>
			),
		},
		{
			path: "/:channelName",
			element: (
				<Suspense fallback={<LoadingIndicator />}>
					<PrivateRoute element={<LiveStreamPage />} />
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
