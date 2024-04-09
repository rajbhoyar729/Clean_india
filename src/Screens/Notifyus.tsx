import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Notifyus = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [wasteLandmark, setWasteLandmark] = useState('');
  const [wasteAddress, setWasteAddress] = useState('');
  const [wasteImage, setWasteImage] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [wasteQuantity, setWasteQuantity] = useState('');

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setWasteImage(pickerResult.uri);
  };

  const handleSubmit = () => {
    // Create form data object
    const formData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      wasteLandmark,
      wasteAddress,
      wasteImage,
      numberOfDays,
      wasteQuantity,
    };

    // Send form data using POST request (Example: using fetch)
    fetch('https://example.com/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data (if needed)
        console.log('Form submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.sectionHeader}>Personal Information:</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={styles.separator} />

      <Text style={styles.sectionHeader}>Waste Information Details:</Text>
      <TextInput
        style={styles.input}
        placeholder="Waste Landmark"
        value={wasteLandmark}
        onChangeText={setWasteLandmark}
      />
      <TextInput
        style={styles.input}
        placeholder="Waste Address"
        value={wasteAddress}
        onChangeText={setWasteAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Waste Quantity"
        value={wasteQuantity}
        onChangeText={setWasteQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
        <Text style={styles.imagePickerText}>Choose Waste Image</Text>
      </TouchableOpacity>
      {wasteImage !== '' && <Image source={{ uri: wasteImage }} style={styles.imagePreview} />}
      
      <TextInput
        style={styles.input}
        placeholder="Number of Days"
        value={numberOfDays}
        onChangeText={setNumberOfDays}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  imagePicker: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePickerText: {
    fontSize: 16,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    resizeMode: 'cover',
  },
});

export default Notifyus;
