import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "./misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "./misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import { RestaurantsApi } from "../Api";
import { PrimaryLink as PrimaryLinkBase } from "./header";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
const PrimaryLink = tw.button`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    // Fetch restaurants
    const fetchRestaurants = async () => {
      try {
        const data = await RestaurantsApi.getTopRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  console.log(restaurants)

  const apiKey = "AIzaSyCLyIS3AOvylY8MUExSSFUNfruG4f6I1vQ"
  const cards = restaurants.map((restaurant) => {
    // Generate image URL
    const imageSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photo_ref}&key=${apiKey}`;
  
    // Generate pricing text
    const pricingText = "$".repeat(Math.round(restaurant.price_level || 1));
  
    return {
      imageSrc,
      title: restaurant.name,
      description:
        "",
      locationText: restaurant.address,
      pricingText,
      rating: restaurant.overall_rating.toFixed(1), // Ensure rating is one decimal point
      url: `http://127.0.0.1:3000/restaurant/${restaurant.restaurant_id}`
    };
  });
  /* Change this according to your needs */
  // const cards = [
  //   {
  //     imageSrc: "https://ewscripps.brightspotcdn.com/dims4/default/9728054/2147483647/strip/true/crop/1024x576+0+54/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2Fc9%2Fb5%2F1d1db7644bf9b8191f07690c0323%2Fap23026751888870.jpg",
  //     title: "Chipotle",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Rome, Italy",
  //     pricingText: "USD 10-15",
  //     rating: "4.8",
  //   },
  //   {
  //     imageSrc: "https://cdn.vox-cdn.com/thumbor/LsnwXGxtC3ezGt3DLnaabSJQfT0=/0x0:1080x803/2000x1333/filters:focal(526x421:527x422)/cdn.vox-cdn.com/uploads/chorus_asset/file/23613883/Exterior_Evening__Taco_Bell_Defy_1_1080x1080_1_crop.jpg",
  //     title: "Taco Bell",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Ibiza, Spain",
  //     pricingText: "USD 8-12",
  //     rating: 4.9,
  //   },
  //   {
  //     imageSrc: "https://image.cnbcfm.com/api/v1/image/107408068-1714480095054-gettyimages-2040998551-zawrzel-economya240229_npoRp.jpeg?v=1723478266&w=1858&h=1045&vtcrop=y",
  //     title: "Starbucks",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Palo Alto, CA",
  //     pricingText: "USD 4-10",
  //     rating: "5.0",
  //   },
  //   {
  //     imageSrc: "https://images.unsplash.com/photo-1606720335177-3d04e70fb13b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWNkb25hbGRzfGVufDB8fDB8fHww",
  //     title: "Mc Donalds",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Arizona, RAK",
  //     pricingText: "USD 5-10",
  //     rating: 4.5,
  //   },
  // ]

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Popular Restaurants</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{card.rating}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{card.pricingText}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.description}</Description>
              </TextInfo>
              <PrimaryLink href={card.url}>View</PrimaryLink>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
