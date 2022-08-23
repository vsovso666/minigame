import React, { useState, useEffect } from 'react';

import {GameEngine} from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';

import {StyleSheet, Text, Button, View, TouchableOpacity, Alert} from 'react-native';

const GameTest = (props) => {
    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(0);

    useEffect(() => {
        setRunning(true)
    }, []);

    const actionEndGame = () => {
        gameEngine && gameEngine.stop();
    }

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }}>{currentPoints}</Text>
            <GameEngine
            ref={(ref) => { setGameEngine(ref) }}
            style={styles.engineWrapper}
            systems={[Physics]}
            entities={entities()}
            running={running}
            onEvent={(e) => {
                switch (e.type) {
                case 'game_over':
                    setRunning(false)
                    gameEngine.stop()
                    break;
                case 'new_point':
                    setCurrentPoints(currentPoints + 1)
                    break;
                }
            }}
            ></GameEngine>

            {!running ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                onPress={() => {
                    setCurrentPoints(0)
                    setRunning(true)
                    gameEngine.swap(entities())
                }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
                    START GAME
                </Text>
                </TouchableOpacity>

            </View> : null}

            <View style={styles.btn}>
            <Button title="stop"onPress={() => actionEndGame()}></Button>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    engineWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    btn: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'red'
    }
});

export default GameTest;