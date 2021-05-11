import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect } from 'react';
import { ImageBackground,Image,  StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import Loader from './Loader';
import { Audio } from 'expo-av';



export default class App extends Component {

  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      alignItems: 'center',
      top: 40,
    },
    backgroundImg: {
      resizeMode: "stretch",
      width: "auto",
      height: "auto",
      position: "absolute",
    },
    btncontainer: {
      flexDirection: 'row',
      flexWrap: "wrap", // CE PARAMETRE FAIS BUGGER LE BACKGROUND IMG
     // alignItems: 'center',
      justifyContent: 'space-between',
      margin: 10,
      marginTop: 40,
    },
    space: {
      width: 15,
      height: 15,
    },
    box: {
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      flex: 1
    },
    button: {
      width: 110,
      height: 120,
      borderColor: "yellow",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 8,
      margin: 7,
    },
    btnText: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    maxWidth: 100,
    },
    scrollView: {
      // border: '1px black solid',
      marginHorizontal: 20,
    },
})
   loading = true;

   SAMPLES = [
    {id: 1, name: "ce putain de vestiaire", uri: require('./assets/Sounds/ce_putain_de_vestiaire.wav')},
    {id: 2, name: "ça me met les gallons", uri: require('./assets/Sounds/ca_me_met_les_gallons.wav')},
    {id: 3, name: "bougez-vous le cul", uri: require('./assets/Sounds/bougez_vous_le_cul.wav')},
    {id: 4, name: "battez-vous", uri: require('./assets/Sounds/battez_vous.wav')},
    {id: 5, name: "ça va néné ?", uri: require('./assets/Sounds/ca_va_nene.wav')},
    {id: 6, name: "ça va néné (2) ?", uri: require('./assets/Sounds/ca_va_nene_2.wav')},
    {id: 7, name: "cassez pas les couilles", uri: require('./assets/Sounds/cassez_pas_les_couilles.wav')},
    {id: 8, name: "ce putain de mitroglou", uri: require('./assets/Sounds/ce_putain_de_mitroglou.wav')},
    {id: 9, name: "c'est honteux", uri: require('./assets/Sounds/cest_honteux.wav')},
    {id: 10, name: "colère noire", uri: require('./assets/Sounds/colere_noire.wav')},
    {id: 11, name: "combinaisons de merde", uri: require('./assets/Sounds/combinaisons_de_merde.wav')},
    {id: 12, name: "cucul tout rouge", uri: require('./assets/Sounds/cul_rouge_comme_les_babouins.wav')},
    {id: 13, name: "Dégun les a demandé", uri: require('./assets/Sounds/degun_les_a_demande_ailleurs.wav')},
    {id: 14, name: "combinaison mes couilles", uri: require('./assets/Sounds/combinaisons_mes_couilles.wav')},
    {id: 15, name: "dispute avec ma femme", uri: require('./assets/Sounds/dispute_avec_ma_femme.wav')},
    {id: 16, name: "enervé à un point", uri: require('./assets/Sounds/enerve_a_un_point.wav')},
    {id: 17, name: "équipe de perlimpimpim", uri: require('./assets/Sounds/equipe_de_perlimpimpin.wav')},
    {id: 18, name: "impardonnables", uri: require('./assets/Sounds/impardonnable.wav')},
    {id: 19, name: "inadmissible", uri: require('./assets/Sounds/inadmissible.wav')},
    {id: 20, name: "j'ai pas passé une bonne nuit", uri: require('./assets/Sounds/jai_pas_passé_une_bonne_nuit.mp3')},
    {id: 21, name: "j'ai regardé Zorro", uri: require('./assets/Sounds/jai_regarde_zorro.wav')},
    {id: 22, name: "je me chie dessus", uri: require('./assets/Sounds/je_me_chie_dessus.wav')},
    {id: 23, name: "joueurs de merde", uri: require('./assets/Sounds/joueurs_de_merde.wav')},
    {id: 24, name: "les couilles à l'envers", uri: require('./assets/Sounds/les_couilles_a_lenvers.wav')},
    {id: 25, name: "mais tu es fou", uri: require('./assets/Sounds/mais_ty_es_fou.wav')},
    {id: 26, name: "mercato de merde", uri: require('./assets/Sounds/mercato_de_merde.wav')},
    {id: 27, name: "on se fait chier", uri: require('./assets/Sounds/on_se_fait_chier.wav')},
    {id: 28, name: "on s'en bat les couilles des critères", uri: require('./assets/Sounds/on_sen_bat_les_couilles_des_criteres.wav')},
    {id: 29, name: "on s'est fait défoncer", uri: require('./assets/Sounds/on_sest_fait_defoncer.wav')},
    {id: 30, name: "on va pas parler du match", uri: require('./assets/Sounds/on_va_pas_parler_du_match.wav')},
    {id: 31, name: "pas dormi de la nuit", uri: require('./assets/Sounds/pas_dormi_de_la_nuit.wav')},
    {id: 32, name: "le patin le couffin", uri: require('./assets/Sounds/patin_couffin.wav')},
    {id: 33, name: "René bafouille", uri: require('./assets/Sounds/rené_baffouille.wav')},
    {id: 34, name: "tu es nul", uri: require('./assets/Sounds/tu_es_nul.wav')},
    {id: 35, name: "vous allez me faire crever", uri: require('./assets/Sounds/vous_allez_me_faire_crever.wav')},
    {id: 36, name: "vous êtes des pitres", uri: require('./assets/Sounds/vous_etes_des_pitres.wav')},
    {id: 37, name: "vous n'avez pas été bons", uri: require('./assets/Sounds/vous_navez_pas_ete_bons.wav')},
    {id: 38, name: "vous nous prenez pour des cons", uri: require('./assets/Sounds/vous_nous_prenez_pour_des_cons.wav')},
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
  <ScrollView>
  <TouchableOpacity
    style={this.styles.button}
    key={i}
    onPress={() => this.playSample(sample.uri)} >
    <View style={this.styles.box}>
    <Text style={this.styles.btnText}>{sample.name}</Text>   
    </View>
    </TouchableOpacity>
  </ScrollView>
  
))
  
  render = () => (
<>


<View style={this.styles.container}>
<ImageBackground style={this.styles.backgroundImg} source={require('./assets/background.jpg')}>   
        
    
{/* 
      <View style={this.styles.title}>
          <Text style={{fontSize: 30, color: 'white',fontFamily: 'Monospace'}}>La boîte à René</Text>
          <View style={this.styles.space}/>
        <StatusBar style="auto" />
      </View> */}

           

      <View style={this.styles.btncontainer}>
        
          <StatusBar />
            { this.renderSamples() }
      </View> 

</ImageBackground>  
</View> 


</>
    
      
  )}
  


 





