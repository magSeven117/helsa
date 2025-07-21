import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Input = (props: TextInputProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#262626',
            width: '100%',
            height: 40,
            position: 'relative',
          }}
        >
          <TextInput
            style={{
              borderRadius: 15,
              padding: 8,
              paddingLeft: 16,
              fontSize: 15,
              fontFamily: 'NunitoSemibold',
              flex: 1,
            }}
            {...props}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;
