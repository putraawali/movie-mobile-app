import React, { useState, useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import CarouselItem from "./CarosuelItem";
import Carousel, { Pagination } from "react-native-snap-carousel";
const { width } = Dimensions.get("window");
export default function CarouselContainer({ data }) {
  const isCarousel = useRef(null);

  if (data && data.length) {
    const [index, setIndex] = useState(0);
    return (
      <View>
        <Carousel
          layout="stack"
          layoutCardOffset={18}
          ref={isCarousel}
          data={data}
          renderItem={CarouselItem}
          sliderWidth={width}
          itemWidth={width}
          inactiveSlideShift={0}
          useScrollView={true}
          loop={true}
          enableSnap={true}
          loopClonesPerSide={data.length}
          autoplay={true}
          scrollEndDragDebounceValue={2}
          enableMomentum={false}
          autoplayDelay={0}
          autoplayInterval={4000}
          onSnapToItem={(index) => setIndex(index)}
        />
        <View style={styles.pagination}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
            animatedDuration={0}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pagination: {
    marginTop: -60,
  },
});
