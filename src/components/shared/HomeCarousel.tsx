/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
	StackedCarousel,
	ResponsiveContainer,
	StackedCarouselSlideProps,
} from "react-stacked-center-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
	DefaultAudioLayout,
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Tag from "@components/ui/Tag";
import Button from "@components/ui/Button";
import "./HomeCarousel.css";
import { makeRequest } from "@services/utils";
import { endpoints } from "@services/endpoints";
import { generateStreamUrl, tempData, videoSliderData } from "@utils/helpers";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLiveStreams } from "@store/slices/liveStreamsSlice";
import { RootState } from "@store/index";

function HomeCarousel() {
	const ref = React.useRef<any>();
	const dispatch = useDispatch();

	const liveStreams = useSelector(
		(state: RootState) => state.liveStreams.liveStreams
	);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				await fetchData(signal);
			} catch (error) {
				toast.error(error);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const fetchData = async (signal) => {
		const { success, message, data } = await makeRequest(
			"get",
			endpoints.videoSlider,
			{},
			{ signal }
		);

		if (success) {
			const updatedData = tempData.map((item: any) => ({
				...item,
				video: generateStreamUrl(item.streamKey),
				coverImage:
					// item.thumbnail ||
					"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
			}));

			dispatch(setLiveStreams(updatedData));
		} else {
			toast.error(message);
		}
	};

	return (
		<>
			{liveStreams.length > 0 && (
				<div className="w-full relative">
					<ResponsiveContainer
						carouselRef={ref}
						render={(width, carouselRef) => {
							return (
								<StackedCarousel
									ref={carouselRef}
									slideComponent={Slide}
									slideWidth={750}
									carouselWidth={width}
									data={liveStreams}
									maxVisibleSlide={5}
									disableSwipe
									customScales={[1, 0.85, 0.7, 0.55]}
									transitionTime={450}
								/>
							);
						}}
					/>

					<Button
						className="absolute top-[43%] p-1 bg-transparent"
						onClick={() => ref.current?.goBack()}
					>
						<AiOutlineLeft style={{ fontSize: 20 }} />
					</Button>
					<Button
						className="absolute top-[43%] right-0 p-1 bg-transparent"
						onClick={() => ref.current?.goNext()}
					>
						<AiOutlineRight style={{ fontSize: 20 }} />
					</Button>
				</div>
			)}
		</>
	);
}

const Slide = React.memo(function (props: StackedCarouselSlideProps) {
	const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } = props;
	const [loadDelay, setLoadDelay] = React.useState<any>();
	const [removeDelay, setRemoveDelay] = React.useState<any>();
	const [loaded, setLoaded] = React.useState(false);

	React.useEffect(() => {
		if (isCenterSlide) {
			clearTimeout(removeDelay);
			setLoadDelay(setTimeout(() => setLoaded(true), 1000));
		} else {
			clearTimeout(loadDelay);
			if (loaded) setRemoveDelay(setTimeout(() => setLoaded(false), 1000));
		}
	}, [isCenterSlide]);

	React.useEffect(() => () => {
		clearTimeout(removeDelay);
		clearTimeout(loadDelay);
	});

	const { coverImage, video, channelName, categoryName, tags, title } =
		data[dataIndex];

	return (
		<div className="slider-card" draggable={false}>
			<div
				className={`cover fill ${isCenterSlide && loaded ? "off" : "on"}`}
			>
				<div
					className="card-overlay fill"
					onClick={() => {
						if (!isCenterSlide) swipeTo(slideIndex);
					}}
				/>
				<img className="cover-image fill" src={coverImage} />
			</div>
			{loaded && (
				<div className="detail fill">
					<div className="aspect-video video">
						<MediaPlayer
							src={video || ""}
							autoplay
							className="flex h-full rounded-none"
						>
							<MediaProvider>
								<Poster
									className="vds-poster h-full"
									src={coverImage}
									alt="thumbnail"
								/>
							</MediaProvider>
							<DefaultAudioLayout icons={defaultLayoutIcons} />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					</div>
					{/* <StreamDescription /> */}
					<div className="description hidden md:flex">
						<div className="info bg-background-base h-full">
							<div className="info-top">
								<div className="profile">
									<div className="pp">
										<img
											src="https://i.pravatar.cc/50"
											alt="Profile"
											loading="lazy"
										/>
									</div>
									<div className="profile-info">
										<div className="username">{channelName}</div>
										<div className="game">{categoryName}</div>
										<div className="viewers">297 viewers</div>
									</div>
								</div>
								<div className="tags">
									{tags.length > 0 &&
										tags.map((i: any, index: number) => {
											return (
												<Tag key={index} to={""}>
													{i.tagName}
												</Tag>
											);
										})}
								</div>
							</div>
							<div className="info-bottom">
								<p>{title}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});

export default HomeCarousel;
