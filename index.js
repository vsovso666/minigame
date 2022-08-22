import React from 'react';
import { Text } from 'react-native';
import { Spring, animated, useSpring } from "@react-spring/native";


const GameTest = (props) => {
    const { opacity, rotateX } = useSpring({
        opacity: 1,
        rotateX: "180deg",
        from: { opacity: 0, rotateX: "0deg" },
        config: { mass: 5, tension: 500, friction: 80 }
    });

    return <AnimatedView style={{opacity, transform: [{rotateX}]}}>
        <Text>AAA KKK {props.label}</Text>
    </AnimatedView>;
};

export default GameTest;