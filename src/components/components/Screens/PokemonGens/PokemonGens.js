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
import { PokemonCard } from '../PokemonCard/PokemonCard';

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
        <View style={styles.container}>
            <FlatList
                data={pokemonsData}
                renderItem={renderPokemon}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.01}
            />
            <StatusBar style="auto" />
        </View>
    );
};

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

export default PokemonGens;
