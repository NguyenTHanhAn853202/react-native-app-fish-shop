import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';

import ContextProvider from './src/Context';
import GolobalApp from './index';



export default function App() {

  return (
    <KeyboardAvoidingView
      behavior='height' enabled={false} 
      style={styles.container}>
     <ContextProvider>
        <View style={styles.container}>
              <GolobalApp />
        </View>
     </ContextProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
 
});
