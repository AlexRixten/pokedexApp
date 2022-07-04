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
import {styles} from '../style'


export const PokemonCard = ({ i }) => {
    const [active, setActive] = useState(false)
    const [favourite, setFavourite] = useState(false)

    const { item } = i
    const [color, setColor] = useState('')

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item.id}/`)
            .then((response) => {
                console.log(response)
                setColor(response.data.color.name)
            });
    }, [])

    const pokemonId = item.id
    const navigation = useNavigation();
    const number = item.id < 10 ? `00${item.id}` : (item.id > 9 && item.id < 100) ? `0${item.id}` : `${item.id}`
    return (
        <TouchableOpacity style={[styles.pokemonContainer, { backgroundColor: color }]} onPress={() => navigation.navigate('PokemonItem', { pokemonId, item, active, favourite })}>
            <View style={{ width: 240, color: '#272727' }}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 23, alignSelf: 'center', marginTop: 10, color: '#272727' }}>
                        {`#${number} ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setActive(!active)}><Text style={{ marginRight: 10, fontSize: 24, color: '#272727' }}>{active ? '★' : '☆'}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => setFavourite(!favourite)}><Text style={{ fontSize: 26, color: '#272727' }}>{favourite ? '●' : '○'}</Text></TouchableOpacity>
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