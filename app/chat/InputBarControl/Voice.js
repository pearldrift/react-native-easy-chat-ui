import React, { PureComponent } from 'react'
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native'
import { Icon } from '@ui-kitten/components'

class Voice extends PureComponent {
  _renderContent = () => {
    const { showVoice, ImageComponent, keyboardIcon, voiceIcon } = this.props
    if (showVoice) {
      return keyboardIcon || <Icon pack={'material'} name={'keyboard'} size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
    } else {
      return voiceIcon || <Icon pack={'simpleline'} name={'microphone'} size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
    }
  }

  render() {
    const {
      inputHeightFix,
      onMethodChange
    } = this.props
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} onPress={onMethodChange} activeOpacity={0.7}>
        <View style={{ height: 30 + inputHeightFix, justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.7}>

          {this._renderContent()}

        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default Voice
