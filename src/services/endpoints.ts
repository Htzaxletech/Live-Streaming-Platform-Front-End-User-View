export const endpoints = {
	login: "/auth/login",
	verify: "/auth/verify",
	register: "/auth/register",
	qrConfirm: "/auth/qr_confirm",
	followChannels: "/home/follow_channel",
	liveChannelList: "/follow/channelListbyLive",
	tags: "/streams/tags",
	mainCategory: "/browse/main_category",
	secondCategory: "/browse/second_category",
	secondCategoryList: "browse/second_category_list",
	browseCategoryByMainID: "/browse/categoryByMainID",
	browseLiveByMainID: "/browse/liveByMainID",
	browseLive: "/streams/get_streams_browse",
	browseLiveByCategoryID: "/browse/liveByCategoryID",
	browseVODByCategoryID: "/browse/VODByCategoryID",
	homeCategory: "/streams/get_categories",
	updateStreamInfo: "/streams/update_streaminfo",
	getStreamInfo: "/streams/get_streaminfo",
	updateStreamKey: "/streams/update_streamkey",
	vodSetting: "/streams/update_vodshowpast",
	videoSlider: "/streams/get_streamsliderlimit",
	startLive: "/profile/go_live",
	updateProfile: "/profile/update_profile",
	vodByCategoryID: "/browse/VODByCategoryID",
	channelData: "/profile/channeldataBychannelID",
	homeLive: "/streams/get_streams",
	profileData: "/profile/channeldataByuserID",
	follow: "/follow/addfollow",
	liveByUserID: "/streams/livebyuserID",
	followLive: "/follow/channelListbyLive",
	vodList: "/follow/VODbyFollowing",
	followCategory: "/follow/CategorybyUserFollowing",
	searchByCategory: "/streams/searchbycategoryname",
	searchByChannel: "/streams/searchbychannelname",
	searchByLive: "/streams/searchbylivename",
	searchByVOD: "/streams/searchbyvodname",
	searchByCategoryTag: "/streams/searchbycategorytag",
	searchByVODTag: "/streams/searchbyvodtag",
	searchByLiveTag: "/streams/searchbylivetag",
	followChannelList: "/follow/ChannelbyUserFollowing",
	profileRecentVOD: "/profile/recentVODdataByuserID",
	profileRecentCategory: "/profile/recentCategorydataByuserID",
	categoryDetail: "/browse/categoryDetail",
	getViewCount: "/streams/get_viewcounts",
	createSocial: "/profile/create_social",
	updateSocial: "/profile/update_social",
	deleteSocial: "/profile/delete_social",
	getSocial: "/profile/get_social",
	getProfile: "/profile/get_userprofile",
	chatData: "/chat/chatdata_live",
	// Add more endpoints as needed
};
