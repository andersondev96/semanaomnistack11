import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigator} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    cont [total, setTotal] = useState(0);
    const [incidents, setIncidents] = useState([]);
    const navigation = useNavigator();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
            if (loading) {
                return;
            }

            if (total > 0 && incidents.length == total) {
                return;
            }

            setLoading(true);

        const response = await api.get('incidents', {
            parms: { page }
        });

        
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);


    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                    <Text style={style.headerText}>
                        Total de <Text style={styles.headerTextBold}>{totak} casos</Text>.
                    </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

            <FlatList 
                data = {incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={}
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', 
                            currency: 'BRL'}).format(Incident.value)}
                        </Text>

                    <TouchableOpacity 
                        style={style.detailsButton}
                        onPress={() => navigateToDetail(incident)}
                     >
                      <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                      <Feather name="arrow-right" size={16} color="#E0241" />   
                     </TouchableOpacity>
                </View>

                )}
            />

        </View>
    );
}