import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Gap, Layanan, Slider, TotalPesananBeranda} from '../../components';
import {getDiskonData} from '../../redux/action/home';
import {colors, fonts, getData} from '../../utils';

const Dashboard = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getData('userProfile').then(res => {
      console.log('token :', res);
      setUserProfile(res);
    });
  }, []);

  const dispatch = useDispatch();
  const {diskon} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getDiskonData());
  }, []);

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profil */}
        <Gap height={40} />
        <View style={styles.wrapProfil}>
          <View>
            <Text style={styles.hallo}>Hallo, Apa kabar ?</Text>
            <Text style={styles.namaUser}>{userProfile.name}</Text>
          </View>
          <Image
            source={{uri: userProfile.profile_photo_url}}
            style={styles.avatar}
          />
        </View>
        <Gap height={20} />
        <View style={styles.wrapContent}>
          <Text style={styles.Lbl}>Diskon Saat ini</Text>
          <View style={styles.garis} />
        </View>
        {diskon.turn_off === 'yes' ? (
          <View />
        ) : (
          <View style={styles.wrapSlider}>
            <Slider
              key={diskon.id}
              category="Kucing"
              deskripsi={diskon.description}
              diskon={diskon.price_discount}
            />
          </View>
        )}
        <Gap height={20} />
        {/* Total Pesanan */}
        <View style={styles.wrapContent}>
          <Text style={styles.Lbl}>Total Pesanan</Text>
          <View style={styles.wrapRiwayat}>
            <TotalPesananBeranda
              category="Grooming"
              total={144}
              color="#1AB1B0"
            />
            <TotalPesananBeranda
              category="Penitipan"
              total={40}
              color="#FF7544"
            />
            <TotalPesananBeranda
              category="Praktik"
              total={42}
              color="#FF4F74"
            />
          </View>
        </View>
        <Gap height={20} />
        {/* Layanan */}
        <View style={styles.wrapContent}>
          <View style={styles.totalPesanan}>
            <Text style={styles.Lbl}>Layanan</Text>
            <Text style={styles.Lbl2}> (Cooming Soon)</Text>
          </View>
          <View style={styles.wrapRiwayat}>
            <Layanan
              category="Grooming"
              // onPress={() => navigation.navigate('Grooming')}
            />
            <Layanan
              category="Penitipan"
              // onPress={() => navigation.navigate('Penitipan')}
            />
            <Layanan
              category="Praktik"
              // onPress={() => navigation.navigate('DrHewan')}
            />
          </View>
        </View>
        <Gap height={20} />
        {/* Tambahkan Diskon */}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  wrapProfil: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  wrapContent: {
    paddingHorizontal: 15,
  },
  hallo: {
    fontFamily: fonts.primary[500],
    fontSize: 14,
    color: colors.text.primary,
  },
  namaUser: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.primary,
    marginTop: 2,
  },

  wrapRiwayat: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingVertical: 5,
  },
  Lbl: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.primary,
  },
  Lbl2: {
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.text.MenuinActive,
  },
  totalPesanan: {
    flexDirection: 'row',
  },
  wrapSlider: {
    marginTop: 10,
    alignItems: 'center',
  },
  garis: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 0.7,
  },
});
