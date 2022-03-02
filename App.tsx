import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';

const colors = {
  bageBg: 'white', //#fff
  iconColor: '#000',
};

const { width } = Dimensions.get('screen');

const iconSize = 25;
const Spacing = 10;

const Header = () => (
  <View style={[styles.header, styles.flexer]}>
    <Feather name="menu" size={iconSize} color={colors.iconColor} />
    <Text style={styles.logo}>COA</Text>
    <View style={styles.flexer}>
      <Image
        style={styles.profileImage}
        source={require('./assets/sophia.jpeg')}
      />
      <AntDesign
        name="caretdown"
        size={iconSize - 5}
        color={colors.iconColor}
      />
    </View>
  </View>
);

const Title = () => (
  <View style={styles.title}>
    <Text style={styles.shipment}>Create Shipment</Text>
    <Text style={styles.subShipment}>Step 1 of 6 &bull; shipper</Text>
  </View>
);

const Asterisk = () => <Text style={{ color: 'red' }}>*</Text>;

const Input: React.FC<any> = ({ label, placeholder }) => (
  <View style={[styles.flexer, styles.inputField]}>
    <View style={styles.inputLabel}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <View style={styles.input}>
      <TextInput placeholder={placeholder} />
    </View>
    <Asterisk />
  </View>
);

const App = () => {
  const [selectedMode, setSelectedMode] = useState();
  const [constructionCheckBox, setConstructionCheckBox] = useState(true);
  const [courierCheckBox, setCourierCheckBox] = useState(false);
  const [drayageCheckBox, setDrayageCheckBox] = useState(false);
  const [droppedCheckBox, setDroppedCheckBox] = useState(false);
  const [insideCheckBox, setInsideCheckBox] = useState(false);


  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const stepper = (
    <View style={[styles.flexer, { padding: Spacing }]}>
      <View style={styles.hr} />
      {React.Children.toArray(
        Array.from({ length: 6 }, () => Math.random()).map((_, index) => (
          <View style={styles.stepWrapper}>
            <Text style={styles.step}>{index + 1}</Text>
          </View>
        )),
      )}
    </View>
  );
  return (
    <SafeAreaView>
      <ScrollView style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bageBg} />
        <Header />
        <Title />
        {stepper}
        <Text style={styles.heading}>
          <Asterisk />
          Indicates Required fields
        </Text>

        <View style={styles.inputWrapper}>
          <Input label="Shipper" placeholder="Company Name" />
          <Input label="Location" placeholder="Address" />
        </View>

        <Input label="Bol #" placeholder="Optional" />
        <View style={styles.flexer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.labelText}>Service Mode</Text>
            <Picker
              mode="dropdown"
              selectedValue={selectedMode}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMode(itemValue)
              }
              style={styles.picker}>
              <Picker.Item label="LTL" value="LTL" />
              <Picker.Item label="second service mode" value="2" />
              <Picker.Item label="third service mode" value="3" />
            </Picker>
          </View>
          <View style={styles.pickerWrapper}>
            <Text style={styles.labelText}>Transit Service</Text>
            <Picker
              mode="dropdown"
              selectedValue={selectedMode}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onValueChange={(itemValue, itemIndex) =>
                setSelectedMode(itemValue)
              }
              style={styles.picker}>
              <Picker.Item label="Select one..." value="" />
              <Picker.Item label="first transit service" value="1" />
              <Picker.Item label="second transit service" value="2" />
            </Picker>
          </View>
        </View>

        <View style={{ margin: 10 }}>
          <Text style={styles.labelText}>Pickup Services</Text>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              value={constructionCheckBox}
              onValueChange={newValue => setConstructionCheckBox(newValue)}
            />
            <Text>Construction Site</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              value={courierCheckBox}
              onValueChange={newValue => setCourierCheckBox(newValue)}
            />
            <Text>Courier Service</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              value={drayageCheckBox}
              onValueChange={newValue => setDrayageCheckBox(newValue)}
            />
            <Text>Drayage Service</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              value={droppedCheckBox}
              onValueChange={newValue => setDroppedCheckBox(newValue)}
            />
            <Text>Dropped Trailer</Text>
          </View>
          <View style={styles.checkboxWrapper}>
            <CheckBox
              disabled={false}
              value={insideCheckBox}
              onValueChange={newValue => setInsideCheckBox(newValue)}
            />
            <Text>Inside Service</Text>
          </View>
        </View>
        <View style={styles.flexer}>
          <View style={styles.pickerWrapper}>
            <Text style={styles.labelText}>Date Pickup Requested</Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setOpen(true)}>
              <Text>Select date...</Text>
              <AntDesign name="caretdown" size={iconSize - 15} color={'#444'} />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={[styles.pickerWrapper]}>
            <Text style={styles.labelText}>Date Pickup Actual</Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setOpen(true)}>
              <Text>Select date...</Text>
              <AntDesign name="caretdown" size={iconSize - 15} color={'#444'} />
            </TouchableOpacity>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </View>
        <View style={styles.flexer}>
          <TouchableOpacity style={styles.secondaryBtn}>
            <Text style={styles.secondaryBtnText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  datePicker: {
    width: width * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    padding: Spacing,
  },
  labelText: {
    fontWeight: '800',
    fontSize: 15,
  },
  dateHeading: {
    fontWeight: '800',
    fontSize: 15,
  },
  secondaryBtnText: {
    color: '#1AA7EC',
    fontSize: 16,
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  primaryBtn: {
    width: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#444',
    margin: 12,
  },
  secondaryBtn: {
    width: width * 0.4,
    margin: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerWrapper: {
    padding: Spacing,
  },
  picker: {
    width: width * 0.4,
    backgroundColor: '#ccc',
  },
  inputWrapper: {
    marginVertical: Spacing * 1.5,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing,
  },
  inputLabel: {
    padding: Spacing,
    borderRightWidth: 2,
    borderRightColor: '#ccc',
    width: width * 0.21,
  },
  inputField: {
    paddingHorizontal: Spacing,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: Spacing,
  },
  heading: {
    textAlign: 'center',
    fontWeight: '800',
  },
  hr: {
    position: 'absolute',
    height: 3,
    width: '100%',
    backgroundColor: '#ccc',
    marginLeft: Spacing,
  },
  step: {
    fontSize: 15,
    fontWeight: '700',
  },
  stepWrapper: {
    padding: 10,
    paddingVertical: 5,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 30,
    backgroundColor: colors.bageBg,
  },
  subShipment: {
    fontWeight: '800',
  },
  shipment: {
    fontSize: 20,
    fontWeight: '500',
  },
  title: {
    backgroundColor: '#ccc',
    padding: Spacing,
  },
  logo: {
    fontWeight: '900',
    color: 'red',
    fontSize: iconSize,
  },
  flexer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  header: {
    padding: Spacing,
  },
  screen: {
    backgroundColor: colors.bageBg,
  },
});

export default App;
