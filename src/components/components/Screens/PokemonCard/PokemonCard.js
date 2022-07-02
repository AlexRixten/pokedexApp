import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
export const PokemonCard = ({ i }) => {
    const { item } = i
    const [color, setColor] = useState('')

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item.id}/`)
            .then((response) => {
                console.log(response)
                setColor(response.data.color.name)
            });
    }, [])

    console.log(color)

    const pokemonId = item.id
    const navigation = useNavigation();
    const number = item.id < 10 ? `00${item.id}` : (item.id > 9 && item.id < 100) ? `0${item.id}` : `${item.id}`
    return (
        <TouchableOpacity style={[styles.pokemonContainer, { backgroundColor: color }]} onPress={() => navigation.navigate('PokemonItem', { pokemonId, item })}>
            <View style={{ width: 240 }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 23, alignSelf: 'center', marginTop: 10 }}>
                        {`#${number} ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity><Text style={{ marginRight: 10, fontSize: 20 }}>☆</Text></TouchableOpacity>
                        <TouchableOpacity><Text style={{ fontSize: 20 }}>◯</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    {item.types.map(obj => <View key={obj.slot} style={styles.pokemonsTypes}><Text style={styles.pokemonsTypesTxt}>{obj.type.name}</Text></View>)}
                </View>
            </View>
            <Image
                style={{ width: 150, height: 100, alignSelf: 'center' }}
                source={{
                    uri: item.sprites.front_default
                }}
                resizeMode='contain'
            />

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 5
    },
    pokemonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        backgroundColor: '#8ca38aab',
        height: 90,
        borderRadius: 20
    },
    pokemonsTypes: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        height: 30
    },
    pokemonsTypesTxt: {
        textAlign: 'center',
    },
});
