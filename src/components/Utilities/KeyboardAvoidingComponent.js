import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Platform } from 'react-native';

const KeyboardAvoidingComponent = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default KeyboardAvoidingComponent;