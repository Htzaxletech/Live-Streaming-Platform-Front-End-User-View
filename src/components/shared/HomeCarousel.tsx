/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
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

interface HomeCarouselProps {
	data: any[];
}

function HomeCarousel({ data }: HomeCarouselProps) {
	const ref = React.useRef<any>();

	return (
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
							data={data}
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

	const { coverImage, video } = data[dataIndex];

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
						<MediaPlayer src={video} autoplay className="rounded-none">
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
					<StreamDescription />
				</div>
			)}
		</div>
	);
});

const StreamDescription = () => {
	return (
		<div className="description">
			<div className="info bg-background-base h-full">
				<div className="info-top">
					<div className="profile">
						<div className="pp">
							<img src="https://i.pravatar.cc/50" alt="Profile" />
						</div>
						<div className="profile-info">
							<div className="username">Linnz</div>
							<div className="game">Dota 2</div>
							<div className="viewers">297 viewers</div>
						</div>
					</div>
					<div className="tags">
						<Tag to={""}>Esports</Tag>
						<Tag to={""}>English</Tag>
						<Tag to={""}>Esports</Tag>
						<Tag to={""}>English</Tag>
						<Tag to={""}>Esports</Tag>
						<Tag to={""}>English</Tag>
					</div>
				</div>
				<div className="info-bottom">
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
						consequatur blanditiis consequuntur ipsa temporeLorem ipsum
						dolor sit, amet consectetur adipisicing elit. A, consequatur
						blanditiis consequuntur ipsa temporeLorem ipsum dolor sit,
						amet consectetur adipisicing elit. A, consequatur blanditiis
						consequuntur ipsa temporeLorem ipsum dolor sit, amet
						consectetur adipisicing elit. A, consequatur blanditiis
						consequuntur ipsa tempore
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomeCarousel;
