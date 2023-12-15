import {Text, StyleSheet} from 'react-native'

const Footer = ({footerStyle}) => {
    return(
        <Text style={[styles.text, footerStyle]}>
            © 2023 Sincopeças App
        </Text>
    )
}

export default Footer

const styles = StyleSheet.create ({
    text:{
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 10,
    color:'gray',
    }
})
