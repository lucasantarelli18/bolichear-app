import React, { useState, Fragment } from "react";
import { Button, View, Text, StyleSheet, Pressable, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Backend from "../backlog";
import { supabase } from "../supabase";
import "react-native-url-polyfill/auto";
import { Input, Block } from "galio-framework";
import Moment from "moment";
import "moment/locale/es";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm } from "react-hook-form";

export function EventosScreen({ route, navigation }) {
  const [eventos, setEventos] = React.useState([]);
  const [tipoEvento, setTipoEvento] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [nombreEvento, setNombreEvento] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible2, setDatePickerVisible2] = useState(false);

  const { idLocal, latitud, longitud } = route.params;

  React.useEffect(() => {
    //Tomo eventos
    //Backend.getEventos().then((items) => {
    //console.log(items);
    //});

    Backend.getTipoEventos().then((items) => {
      const arr = [];
      for (const i in items) {
        arr.push({ label: items[i].tipo, value: items[i].id });
      }
      console.log(arr);
      setItems(arr);
    });
    /*
    Backend.insertEvento().then((items) => {
      //console.log(items);
      setEventos(items);
    });*/
  }, []);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisible2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisible2(false);
  };

  return (
    <View style={styles.container2}>
      {/*Pide al usuario NOMBRE DEL EVENTO*/}
      <Input
        placeholder="Ingrese nombre del evento"
        onChangeText={(nuevoEvento) => setNombreEvento(nuevoEvento)}
        value={nombreEvento}
      ></Input>
      {/*Selector de*/}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Tipo de evento"
      />
      <Input
        placeholder="Inserte la descripcion"
        onChangeText={(nuevaDesc) => setDescripcion(nuevaDesc)}
        value={descripcion}
      ></Input>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {horaInicio ? horaInicio : "No date selected"}
      </Text>
      <Button title="Select a date inicio" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={(datetime) => {
          hideDatePicker();
          setHoraInicio(Moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
          console.log(datetime);
        }}
        onCancel={hideDatePicker}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        {horaFin ? horaFin : "No date selected"}
      </Text>
      <Button title="Select a date fin" onPress={showDatePicker2} />
      <DateTimePickerModal
        isVisible={datePickerVisible2}
        mode="datetime"
        onConfirm={(datetime) => {
          hideDatePicker2();
          setHoraFin(Moment(datetime).format("YYYY-MM-DD HH:mm:ss"));
        }}
        onCancel={hideDatePicker2}
      />

      <Block alignSelf="center" style={styles.button}>
        <Pressable
          style={styles.button}
          onPress={() =>
            Backend.insertEvento(
              nombreEvento,
              descripcion,
              horaInicio,
              horaFin,
              value,
              idLocal
            ).then((items) => {
              Alert.alert("Evento creado");
              navigation.navigate("Locales", {
                latitud: latitud,
                longitud: longitud,
              });
            })
          }
        >
          <Text style={styles.text}>CREAR EVENTO</Text>
        </Pressable>
      </Block>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    borderRadius: 1,
    padding: 10,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 120,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    position: "absolute",
    top: "92%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
