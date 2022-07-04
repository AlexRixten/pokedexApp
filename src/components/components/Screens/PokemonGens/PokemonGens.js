import React, { useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';
import { styles } from '../style'
import { PokemonCard } from '../PokemonCard/PokemonCard';
import { Header } from '../../../Header/Header';

const PokemonGens = () => {
    const [firstGenPokemonsDetails, setFirstGenPokemonsDetails] = useState([])
    const [pokemonsData, setPokemonsData] = useState([])
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)

    const fetchFirstGenPokemons = async (offset) => {
        const firstGenPokemonsIdsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
        const firstGenPokemonsIdsBody = await firstGenPokemonsIdsResponse.json()
        const firstGenPokemonsDetails = await Promise.all(
            firstGenPokemonsIdsBody.results.map(async (poke) => {
                const pokeDetails = await fetch(poke.url)

                return await pokeDetails.json()
            })
        )
        setPokemonsData([...pokemonsData, ...firstGenPokemonsDetails])
        setCount(firstGenPokemonsIdsBody.count)
    };

    useEffect(() => {
        fetchFirstGenPokemons(offset)
    }, [offset])

    const loadMoreData = () => {
        console.log(1)
        if (offset < count) {
            setOffset(prevOffset => prevOffset + 20)
        }
    }

    const renderPokemon = i => {
        return <PokemonCard i={i} />
    }


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList
                data={pokemonsData}
                renderItem={renderPokemon}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.2}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
};

export default PokemonGens;
