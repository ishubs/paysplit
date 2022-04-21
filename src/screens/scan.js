import React, { Component, Fragment } from "react";
import {
  TouchableOpacity,
  Text,
  Linking,
  View,
  Image,
  ImageBackground,
  BackHandler,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import styles from "./scanStyle";
class scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: true,
      ScanResult: false,
      result: null,
    };
  }

  // componentDidMount(this.scanner.reactivate())
  onSuccess = (e) => {
    const check = e.data.substring(0, 4);

    console.log("scanned data" + check);
    this.setState({
      result: e,
      scan: true,
      ScanResult: true,
    });
    console.log(this.state.result+"result")
    if (check === "http") {
      Linking.openURL(e.data).catch((err) =>
        console.error("An error occured", err)
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };
  activeQR = () => {
    this.setState({ scan: true });
  };
  scanAgain = () => {
    this.setState({ scan: true, ScanResult: false });
  };

  render() {
    const { scan, ScanResult, result } = this.state;
    if (ScanResult) {
      // this.props.setResult(result)
    this.props.navigation.navigate('Wallet', result)

    }
      // return <WalletScreen ScanResult={result} />;

    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          {scan && (
            <QRCodeScanner
            ref={(node) => { this.scanner = node }}
              reactivate={true}
              showMarker={true}
              onRead={this.onSuccess}
              topContent={
                <Text style={styles.centerText}>
                  Please move your camera {"\n"} over the QR Code
                </Text>
              }
              bottomContent={
                <View>
                  <ImageBackground
                    source={require("./assets/bottom-panel.png")}
                    style={styles.bottomContent}
                  >
                    {/* <TouchableOpacity style={styles.buttonScan2} 
                                            onPress={() => this.scanner.reactivate()} 
                                            onLongPress={() => this.setState({ scan: false })}>
                                            <Image source={require('./assets/camera2.png')}></Image>
                                        </TouchableOpacity> */}
                  </ImageBackground>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}
export default scan;
