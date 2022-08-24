import React, { useState, useEffect } from 'react';

import {GameEngine} from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import Timer from "./utils/perf-timer";

import {StyleSheet, Text, Button, View, TouchableOpacity, Alert} from 'react-native';

export const GameTest = (props) => {
    const {user, onEndGame} = props;
    const [gameStatus, setGameStatus] = useState(0);
    //0 - welcome, 1 - start game, 2 - end game

    const [running, setRunning] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [currentPoints, setCurrentPoints] = useState(0);

    useEffect(() => {
        setRunning(false);
        return () => {
            console.log('[Game is removed and stop engine]');
            gameEngine && gameEngine.stop();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={{margin: 60}}>
                {user && user.name && <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>{user.name}</Text>}
                <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>
                {currentPoints}
                </Text>
            </View>
            <GameEngine
                ref={(ref) => { setGameEngine(ref) }}
                style={styles.engineWrapper}
                timer={new Timer()}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e) => {
                    switch (e.type) {
                    case 'game_over':
                        setRunning(false);
                        setGameStatus(2);
                        gameEngine.stop();
                        break;
                    case 'new_point':
                        setCurrentPoints(currentPoints + 1)
                        break;
                    }
                }}
            ></GameEngine>

            {!running ?

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {gameStatus === 0 ?
                    <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                        onPress={() => {
                            setCurrentPoints(0)
                            setRunning(true)
                            setGameStatus(1)
                            gameEngine.swap(entities())
                    }}>
                        <Text style={{ width: 200, textAlign:'center', fontWeight: 'bold', color: 'white', fontSize: 30 }}>START GAME</Text>
                    </TouchableOpacity>
                 : gameStatus === 2 ?
                 <>
                    <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10, marginBottom: 20 }}
                        onPress={() => {
                            onEndGame({user: user, score:currentPoints });
                    }}>
                        <Text style={{ width: 200, textAlign:'center', fontWeight: 'bold', color: 'white', fontSize: 30 }}>End Game</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
                        onPress={() => {
                            setCurrentPoints(0)
                            setRunning(true)
                            gameEngine.swap(entities())
                    }}>
                        <Text style={{ width: 200, textAlign:'center', fontWeight: 'bold', color: 'white', fontSize: 30 }}>Retry</Text>
                    </TouchableOpacity>
                 </>
                : null}

                 </View>

             : null}

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