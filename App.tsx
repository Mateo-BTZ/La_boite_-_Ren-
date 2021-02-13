import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import Loader from './Loader';
import { Audio } from 'expo-av';



export default class App extends Component {

  styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
    },
    title: {
      flex: 1,
      alignItems: 'center',
      top: 40,
    },
    backgroundImg: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    btncontainer: {
      flexDirection: 'row',
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      
    },
    space: {
      width: 15,
      height: 15,
    },
})
   loading = true;

   SAMPLES = [
    { name: "ce putain de vestiaire", uri: require('./assets/sounds/ce_putain_de_vestiaire.wav')},
    { name: "ça me met les gallons", uri: require('./assets/sounds/ca_me_met_les_gallons.wav')},
    { name: "bougez-vous le cul", uri: require('./assets/sounds/bougez_vous_le_cul.wav')},
    { name: "battez-vous", uri: require('./assets/sounds/battez_vous.wav')},
    { name: "ça va néné ?", uri: require('./assets/sounds/ca_va_nene.wav')},
    { name: "ça va néné (2) ?", uri: require('./assets/sounds/ca_va_nene_2.wav')},
    { name: "cassez pas les couilles", uri: require('./assets/sounds/cassez_pas_les_couilles.wav')},
    { name: "ce putain de mitroglou", uri: require('./assets/sounds/ce_putain_de_mitroglou.wav')},
    { name: "c'est honteux", uri: require('./assets/sounds/cest_honteux.wav')},
    { name: "colère noire", uri: require('./assets/sounds/colere_noire.wav')},
    { name: "combinaisons de merde", uri: require('./assets/sounds/combinaisons_de_merde.wav')},
    { name: "cucul tout rouge", uri: require('./assets/sounds/cul_rouge_comme_les_babouins.wav')},
    { name: "Dégun les a demandé", uri: require('./assets/sounds/degun_les_a_demande_ailleurs.wav')},
    { name: "combinaison mes couilles", uri: require('./assets/sounds/combinaisons_mes_couilles.wav')},
    { name: "dispute avec ma femme", uri: require('./assets/sounds/dispute_avec_ma_femme.wav')},
    { name: "enervé à un point", uri: require('./assets/sounds/enerve_a_un_point.wav')},
    { name: "équipe de perlimpimpim", uri: require('./assets/sounds/equipe_de_perlimpimpin.wav')},
    { name: "impardonnables", uri: require('./assets/sounds/impardonnable.wav')},
    { name: "inadmissible", uri: require('./assets/sounds/inadmissible.wav')},
    { name: "j'ai pas passé une bonne nuit", uri: require('./assets/sounds/jai_pas_passé_une_bonne_nuit.mp3')},
    { name: "j'ai regardé Zorro", uri: require('./assets/sounds/jai_regarde_zorro.wav')},
    { name: "je me chie dessus", uri: require('./assets/sounds/je_me_chie_dessus.wav')},
    { name: "joueurs de merde", uri: require('./assets/sounds/joueurs_de_merde.wav')},
    { name: "les couilles à l'envers", uri: require('./assets/sounds/les_couilles_a_lenvers.wav')},
    { name: "mais tu es fou", uri: require('./assets/sounds/mais_ty_es_fou.wav')},
    { name: "mercato de merde", uri: require('./assets/sounds/mercato_de_merde.wav')},
    { name: "on se fait chier", uri: require('./assets/sounds/on_se_fait_chier.wav')},
    { name: "on s'en bat les couilles des critères", uri: require('./assets/sounds/on_sen_bat_les_couilles_des_criteres.wav')},
    { name: "on s'est fait défoncer", uri: require('./assets/sounds/on_sest_fait_defoncer.wav')},
    { name: "on va pas parler du match", uri: require('./assets/sounds/on_va_pas_parler_du_match.wav')},
    { name: "pas dormi de la nuit", uri: require('./assets/sounds/pas_dormi_de_la_nuit.wav')},
    { name: "le patin le couffin", uri: require('./assets/sounds/patin_couffin.wav')},
    { name: "René bafouille", uri: require('./assets/sounds/rené_baffouille.wav')},
    { name: "tu es nul", uri: require('./assets/sounds/tu_es_nul.wav')},
    { name: "vous allez me faire crever", uri: require('./assets/sounds/vous_allez_me_faire_crever.wav')},
    { name: "vous êtes des pitres", uri: require('./assets/sounds/vous_etes_des_pitres.wav')},
    { name: "vous n'avez pas été bons", uri: require('./assets/sounds/vous_navez_pas_ete_bons.wav')},
    { name: "vous nous prenez pour des cons", uri: require('./assets/sounds/vous_nous_prenez_pour_des_cons.wav')},
]

componentDidMount = () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
  })
}

playSample = async (uri) => {
  const { status } = await Audio.Sound.createAsync(
    uri,
    { shouldPlay: true }
  )
}

renderSamples = () => this.SAMPLES.map((sample, i) => (
  <>
  <Button
    color="black"
    key={i}
    title={sample.name}
    onPress={() => this.playSample(sample.uri)} />
    <View style={this.styles.space}/>
  </>
))
  
  render = () =>
    <ImageBackground source={require('./assets/background.jpg')}>
    <View>
    
        
    <>

      <View style={this.styles.title}>
          <Text style={{fontSize: 30, color: 'white',fontFamily: 'Monospace'}}>La boîte à René</Text>
          <View style={this.styles.space}/>
        <StatusBar style="auto" />
        </View>

        <View style={this.styles.space}/>
        <View style={this.styles.space}/>
           
      <View style={this.styles.container}>
        <View style={this.styles.btncontainer}>
          <StatusBar />
            { this.renderSamples() }
        </View>
      </View>
    </>
     
     </View>
    </ImageBackground>   
      
}
  


 





