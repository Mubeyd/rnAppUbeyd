import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function TestScreen() {
  const [text, setText] = useState('');

  useEffect(() => {
    setTimeout(() => {
      // setText("timeout is called")
      //   console.log('timeout is called');
    }, 1000);
  }, []);

  return (
    <View>
      <Text>Test Screen</Text>
      <Text testID="myText">{text}</Text>
      <Button testID="myButton" title="Click me" onPress={() => setText('Hello world')} />
    </View>
  );
}
