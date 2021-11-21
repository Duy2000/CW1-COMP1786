import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Platform,
} from "react-native";
// styled components
import {
  ListView,
  ListViewHidden,
  TodoText,
  TodoDate,
  HiddenButton,
  SwipedTodoText,
  colors,
} from "../styles/appStyles";
import { SwipeListView } from "react-native-swipe-list-view";
import { Entypo } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
// Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

const ListItems = ({ todos, setTodos, handleTriggerEdit }) => {
  // List things
  const handleDeleteTodo = (rowMap, rowKey) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
    newTodos.splice(todoIndex, 1);

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
      .then(() => {
        setTodos(newTodos);
      })
      .catch((error) => console.log(error));
  };

  // For styling currently swiped todo row
  const [swipedRow, setSwipedRow] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      {/* search */}
      <Searchbar
        placeholder="Search"
        underlineColorAndroid="transparent"
        placeholder="Search Here"
        style={{ marginBottom: 20 }}
      />
      {todos.length == 0 && <TodoText>No news today</TodoText>}
      {todos.length != 0 && (
        <SwipeListView
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(data) => {
            const RowText =
              data.item.key == swipedRow ? SwipedTodoText : TodoText;
            return (
              <ListView
                underlayColor={colors.primary}
                onPress={() => {
                  handleTriggerEdit(data.item);
                }}
              >
                <>
                  <RowText>{"Property type: " + data.item.type}</RowText>
                  <RowText>{"Bedroom: " + data.item.bedroom}</RowText>
                  <RowText>{"Price: " + data.item.price}$</RowText>
                  <RowText>{"Furniture: " + data.item.furniture}</RowText>
                  <RowText>{"Note: " + data.item.note}</RowText>
                  <RowText>{"Reporter : " + data.item.name}</RowText>
                  <RowText>{"Phone : " + data.item.phone}</RowText>
                  <TodoDate>{data.item.date}</TodoDate>
                </>
              </ListView>
            );
          }}
          renderHiddenItem={(data, rowMap) => (
            <ListViewHidden>
              <HiddenButton
                onPress={() => handleDeleteTodo(rowMap, data.item.key)}
              >
                <Entypo name="trash" size={25} color={colors.secondary} />
              </HiddenButton>
            </ListViewHidden>
          )}
          leftOpenValue={80}
          previewRowKey={"1"}
          previewOpenValue={80}
          previewOpenDelay={3000}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: 30, marginBottom: 40 }}
          // Handling swiped todo row
          onRowOpen={(rowKey) => {
            setSwipedRow(rowKey);
          }}
          onRowClose={() => {
            setSwipedRow(null);
          }}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 5,
  },

  row: {
    fontSize: 18,
    padding: 12,
  },

  textInput: {
    textAlign: "center",
    height: 42,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 8,
    backgroundColor: "#FFFF",
    marginTop: -15,
    marginBottom: 10,
  },
});

export default ListItems;
