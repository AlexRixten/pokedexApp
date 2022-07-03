import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tab, TabView } from '@rneui/themed';
import * as Progress from 'react-native-progress';
import { styles } from '../style';

export const PokemonItem = ({ route }) => {
    const { pokemonId, item, active, favourite } = route.params;
    const number = item.id < 10 ? `00${item.id}` : (item.id > 9 && item.id < 100) ? `0${item.id}` : `${item.id}`
    let totalNumber = 0
    const [index, setIndex] = useState(0);

    const [color, setColor] = useState([])
    const [type, setType] = useState([])
    const [evolution, setEvolution] = useState([])
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item.id}/`)
            .then((response) => {
                setColor(response.data.color.name)
            });
        axios.get(`https://pokeapi.co/api/v2/type/${item.id}/`)
            .then((response) => {
                setType(response.data)
            });
        axios.get(`https://pokeapi.co/api/v2/evolution-chain/${item.id}/`)
            .then((response) => {
                setEvolution(response.data)
            });
    }, [])

    console.log(pokemonId, item, type)
    return (
        <SafeAreaView style={{ backgroundColor: color, height: '100%' }}>
            <View style={{ marginTop: 10, marginHorizontal: 5, borderRadius: 20, flexDirection: 'row', paddingHorizontal: 25, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#8ca38aab', }}>
                <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{color: '#272727', fontSize: 23, alignSelf: 'center', marginTop: 10 }}>
                            {`#${number} ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ marginRight: 10, fontSize: 24, color: '#272727' }}>{active ? '★' : '☆'}</Text>
                            <Text style={{ fontSize: 26, color: '#272727' }}>{favourite ? '●' : '○'}</Text>
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
            </View>
            <ScrollView style={{ marginHorizontal: 5 }}>
                <View>
                    <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 20, color: '#272727' }}>Species</Text>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20 }}>
                        <View style={{ padding: 10, borderWidth: 1, borderRadius: 10, borderColor: 'gray' }}>
                            <Text style={{}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere commodi dicta qui illo, nulla consectetur quaerat saepe quibusdam reprehenderit, harum placeat sapiente at magnam amet minima deleniti rem dignissimos nisi.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, }}>
                            <View style={{ flex: 1, marginRight: 15 }}>
                                <View style={{ padding: 5, borderWidth: 1, borderRadius: 10, borderColor: 'gray' }}>
                                    <Text style={{ textAlign: 'center' }}>{item.height / 10} m</Text>
                                </View>
                                <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12 }}>Height</Text>
                            </View>
                            <View style={{ flex: 1, }}>
                                <View style={{ padding: 5, borderWidth: 1, borderRadius: 10, borderColor: 'gray', }}>
                                    <Text style={{ textAlign: 'center' }}>{item.weight / 10} kg</Text>
                                </View>
                                <Text style={{ textAlign: 'center', marginTop: 5, fontSize: 12 }}>Weight</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 20, color: '#272727' }}>Abilities</Text>
                    <View style={{ backgroundColor: '#fff', borderRadius: 20, paddingTop: 10, paddingBottom: 20, paddingHorizontal: 20 }}>
                        {item.abilities.map(obj =>
                            <TouchableOpacity key={obj.slot} style={[styles.pokemonsTypes, !obj.is_hidden ? { backgroundColor: 'gray', marginTop: 10 } : { marginTop: 10 }]} >
                                {!obj.is_hidden
                                    ? <Text style={styles.pokemonsTypesTxt}>{obj.ability.name.charAt(0).toUpperCase() + obj.ability.name.slice(1)}</Text> : <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ height: '100%', width: 100, backgroundColor: 'gray', borderRadius: 10, alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Hidden</Text>
                                        </View>
                                        <Text style={[styles.pokemonsTypesTxt, { flex: 1 }]}>{obj.ability.name.charAt(0).toUpperCase() + obj.ability.name.slice(1)}</Text>
                                    </View>}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View >
                    <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 20, color: '#272727' }}>Base Stats</Text>
                    <View style={{ backgroundColor: '#fff', paddingVertical: 10, paddingLeft: 10, borderRadius: 20, height: 280 }}>
                        <Tab
                            value={index}
                            onChange={(e) => setIndex(e)}
                        >
                            <Tab.Item
                                title="Base stats"
                                titleStyle={{ fontSize: 12, color: '#272727' }}
                                containerStyle={{ backgroundColor: 'darkgray', borderRadius: 20, marginRight: 5, height: 45 }}
                                buttonStyle={(active) => active ? { backgroundColor: 'gray', } : ''}
                            />
                            <Tab.Item
                                title="Min"
                                titleStyle={{ fontSize: 12, color: '#272727' }}
                                containerStyle={{ backgroundColor: 'darkgray', borderRadius: 20, marginRight: 5, height: 45 }}
                                buttonStyle={(active) => active ? { backgroundColor: 'gray' } : {}}
                            />
                            <Tab.Item
                                title="Max"
                                titleStyle={{ fontSize: 12, color: '#272727' }}
                                containerStyle={{ backgroundColor: 'darkgray', borderRadius: 20, height: 45, marginRight: 10 }}
                                buttonStyle={(active) => active ? { backgroundColor: 'gray' } : ''}
                            />
                        </Tab>

                        <TabView value={index} onChange={setIndex} animationType="spring">
                            <TabView.Item style={{ backgroundColor: '#fff', width: '100%' }}>
                                <View style={{ marginTop: 10 }}>
                                    {item.stats?.map((obj, index) => {
                                        totalNumber += obj.base_stat
                                        return (<View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{ width: 100, backgroundColor: 'gray', textAlign: 'center', color: '#272727' }}>{obj.stat.name.length > 12 ? obj.stat.name.split('-')[0] = 'Sp. ' + obj.stat.name.split('-')[1] : obj.stat.name.charAt(0).toUpperCase() + obj.stat.name.slice(1)}</Text>
                                            <Progress.Bar animated={true} color={'darkgray'} progress={`0.${obj.base_stat}`} width={200} height={20} borderWidth={0} borderRadius={0} />
                                            <Text style={{color: '#272727'}}>{obj.base_stat}</Text>
                                        </View>
                                        )
                                    })}
                                    <Text style={{ marginVertical: 10, textAlign: 'center' }}>Total: {totalNumber}</Text>
                                </View>
                            </TabView.Item>
                            <TabView.Item style={{ backgroundColor: '#fff', width: '100%' }}>
                                <Text h1>Favorite</Text>
                            </TabView.Item>
                            <TabView.Item style={{ backgroundColor: '#fff', width: '100%' }}>
                                <Text h1>Cart</Text>
                            </TabView.Item>
                        </TabView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}
