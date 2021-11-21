import React, { useState } from "react";
import { Modal } from "react-native";
import {
  ModalButton,
  ModalContainer,
  ModalView,
  StyledInput,
  ModalAction,
  ModalActionGroup,
  ModalIcon,
  HeaderTitle,
  colors,
} from "./../styles/appStyles";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { View, Picker, StyleSheet } from "react-native";

const InputModal = ({
  typeValue,
  setTypeValue,
  bedroomValue,
  setBedroomValue,
  priceInputValue,
  setPriceInputValue,
  furnitureValue,
  setFurnitureValue,
  noteValue,
  setNoteValue,
  nameValue,
  setNameValue,
  phoneValue,
  setPhoneValue,
  modalVisible,
  setModalVisible,
  handleAddTodo,
  todoToBeEdited,
  setTodoToBeEdited,
  todoInputValue,
  setTodoInputValue,
  handleEditTodo,
  todos,
}) => {
  const handleSubmit = () => {
    if (!typeValue) {
      return alert("You must chose property type!");
    }
    if (!bedroomValue) {
      return alert("You must fill information in bedroom input!");
    }
    if (!priceInputValue) {
      return alert("You must fill information in price input!");
    }
    if (!nameValue) {
      return alert("You must fill information in name input!");
    }
    if (!phoneValue) {
      return alert("You must fill in information in phone input!");
    }
    if (!todoToBeEdited) {
      handleAddTodo({
        type: typeValue,
        bedroom: bedroomValue,
        price: priceInputValue,
        furniture: furnitureValue,
        note: noteValue,
        name: nameValue,
        phone: phoneValue,
        date: new Date().toLocaleString(),
        key: `${
          (todos[todos.length - 1] &&
            parseInt(todos[todos.length - 1].key) + 1) ||
          1
        }`,
      });
    } else {
      handleEditTodo({
        type: typeValue,
        bedroom: bedroomValue,
        price: priceInputValue,
        furniture: furnitureValue,
        note: noteValue,
        name: nameValue,
        phone: phoneValue,
        title: todoInputValue,
        date: todoToBeEdited.date,
        key: todoToBeEdited.key,
      });
    }
    if (
      !typeValue ||
      !bedroomValue ||
      !priceInputValue ||
      !nameValue ||
      !phoneValue
    )
      return alert("Details Empty");

    setTypeValue("");
    setBedroomValue("");
    setPriceInputValue("");
    setFurnitureValue("");
    setNoteValue("");
    setNameValue("");
    setPhoneValue("");
    setTodoInputValue("");
    return alert("you have successfully posted!");
  };

  const handleCloseModal = () => {
    setTypeValue("");
    setBedroomValue("");
    setPriceInputValue("");
    setFurnitureValue("");
    setNoteValue("");
    setNameValue("");
    setPhoneValue("");
    setTodoInputValue("");
    setModalVisible(false);
    setTodoToBeEdited(null);
  };

  return (
    <>
      <ModalButton onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={30} color="white" />
      </ModalButton>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
          <ModalView>
            <ModalIcon>
              <HeaderTitle>Add News</HeaderTitle>
              <AntDesign name="edit" size={30} color={colors.tertiary} />
            </ModalIcon>
            {/* Type of apartment */}
            <Picker
              style={{ height: 50, width: 300 }}
              selectedValue={typeValue}
              onValueChange={(itemValue, itemIndex) => setTypeValue(itemValue)}
            >
              <Picker.Item label="Select property type" value="None" />
              <Picker.Item label="House" value="House" />
              <Picker.Item label="Penthouses" value="Penthouses" />
              <Picker.Item label="Apartment" value="Apartment" />
              <Picker.Item label="Villa" value="Villa" />
              <Picker.Item label="Bungalow" value="Bungalow" />
            </Picker>
            {/* number of bedroom */}
            <StyledInput
              placeholder="Bedroom"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.tertiary}
              keyboardType="numeric"
              onChangeText={(numeric) => setBedroomValue(numeric)}
              value={bedroomValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />
            {/* Price */}
            <StyledInput
              placeholder="Price: $/month"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.tertiary}
              keyboardType="numeric"
              onChangeText={(numeric) => setPriceInputValue(numeric)}
              value={priceInputValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />
            {/* Furniture types optional field*/}
            <Picker
              style={{ height: 50, width: 300 }}
              selectedValue={furnitureValue}
              onValueChange={(itemValue, itemIndex) =>
                setFurnitureValue(itemValue)
              }
            >
              <Picker.Item label="Furniture ?" value="None" />
              <Picker.Item label="Furnished" value="Furnished" />
              <Picker.Item label="Unfurnished" value="Unfurnished" />
              <Picker.Item label="Part Furnished" value="Part Furnished" />
              <Picker.Item label="No" value="No" />
            </Picker>
            {/*  Note  optional field*/}
            <StyledInput
              placeholder="Note"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.tertiary}
              onChangeText={(text) => setNoteValue(text)}
              value={noteValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />
            {/* Name  */}
            <StyledInput
              placeholder="Name"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.tertiary}
              onChangeText={(text) => setNameValue(text)}
              value={nameValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />
            {/* Phone */}
            <StyledInput
              placeholder="Phone"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.tertiary}
              keyboardType="numeric"
              onChangeText={(numeric) => setPhoneValue(numeric)}
              value={phoneValue}
              autoFocus={true}
              onSubmitEditing={handleSubmit}
            />

            <ModalActionGroup>
              <ModalAction onPress={handleCloseModal} color={colors.primary}>
                <AntDesign name="close" size={28} color={colors.tertiary} />
              </ModalAction>
              <ModalAction onPress={handleSubmit} color={colors.buttonPlus}>
                <AntDesign name="check" size={28} color={colors.tertiary} />
              </ModalAction>
            </ModalActionGroup>
          </ModalView>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default InputModal;
