import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { insertFormData, createTables } from '../database/db';
import * as MailComposer from 'expo-mail-composer';

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

  useEffect(() => {
    // Call the function to create the database tables when the component mounts
    createTables().then(() => {
      console.log('Tables created successfully');
    }).catch(error => {
      console.error('Error creating tables:', error);
    });
  }, []); // Empty dependency array to run the effect only once

  const handleImagePick = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) { // Change 'cancelled' to 'canceled'
      return;
    }

    setWasteImage(pickerResult.assets[0].uri);
  };

  const handleSubmit = async () => {
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

    insertFormData(formData);

    // Send form data to email using expo-mail-composer
    const recipientEmail = email; // Replace with your desired email address
    const subject = 'Your for is submitted ';
    const body = `
      First Name: ${firstName}
      Last Name: ${lastName}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Waste Landmark: ${wasteLandmark}
      Waste Address: ${wasteAddress}
      Waste Image: ${wasteImage}
      Number of Days: ${numberOfDays}
      Waste Quantity: ${wasteQuantity}
    `;

    try {
      await MailComposer.composeAsync({
        recipients: [recipientEmail],
        subject,
        body,
        attachments: [{ uri: wasteImage, type: 'image/jpeg' }] as any,
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
       {/* Your form fields and image picker remain the same */}
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