import React, { PureComponent } from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native'
import Container from './Container'
import Voice from './Voice'
import VoiceButton from './VoiceButton'
import Input from './Input'
import { Icon } from '@ui-kitten/components'
const { width } = Dimensions.get('window')

export default class InputBar extends PureComponent {
  constructor(props) {
    super(props)
    this.inputHeight = 0
  }

  setInputHeight = (height) => {
    this.inputHeight = height
  }

  renderIcon = () => {
    const { sendIcon, plusIcon, usePlus, messageContent, sendUnableIcon, ImageComponent } = this.props
    const sendAbleIcon = sendIcon || <Icon pack={'material'} name={'send-lock-outline'} size={25} style={{ height: 25, width: 25, color: '#fff' }} />
    const sendUnableIconDefault = sendUnableIcon ||  <Icon pack={'material'} name={'send-lock-outline'} size={25} style={{ height: 25, width: 25, color: '#fff' }} />
    if (usePlus) {
      if (messageContent.trim().length) {
        return sendAbleIcon
      } else {
        return plusIcon || <Icon pack={'feather'} name={'plus'} size={28} style={{ height: 28, width: 28, color: '#fff' }} />
      }
    } else {
      return messageContent.trim().length ? sendAbleIcon : sendUnableIconDefault
    }
  }

  renderEmojieIcon = () => {
    const { isEmojiShow, keyboardIcon, emojiIcon, ImageComponent } = this.props
    if (isEmojiShow) {
      return keyboardIcon || <Icon pack={'material'} name={'keyboard'} size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
    } else {
      return emojiIcon || <Icon pack={'simpleline'} name={'emotsmile'} size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
    }
  }

  render() {
    const {
      messageContent,
      onSubmitEditing = () => { },
      textChange = () => { }, onMethodChange = () => { }, onContentSizeChange = () => { },
      inputStyle,
      inputOutContainerStyle,
      inputContainerStyle,
      inputHeightFix,
      xHeight,
      isVoiceEnd,
      useVoice,
      useEmoji,
      usePlus,
      inputChangeSize,
      placeholder,
      pressInText,
      pressOutText,
      isShowPanel,
      isPanelShow,
      audioHasPermission,
      onFocus,
      keyboardIcon,
      voiceIcon,
      isEmojiShow,
      isIphoneX,
      ImageComponent,
      showVoice,
      voiceStart,
      rootHeight,
      voiceEnd,
      changeVoiceStatus
    } = this.props
    const enabled = (() => {
      if (Platform.OS === 'android') {
        if (isPanelShow) {
          return true
        }
        if (isEmojiShow) {
          return true
        }
        return false
      } else {
        return false
      }
    })()
    return (
      <Container
        setInputHeight={this.setInputHeight}
        inputOutContainerStyle={inputOutContainerStyle}
        isIphoneX={isIphoneX}
        xHeight={xHeight}
        inputContainerStyle={inputContainerStyle}
      >
        <View style={styles.inputForm}>
          {
            useEmoji
              ?
              <TouchableNativeFeedback activeOpacity={0.7} delayPressIn={0} onPress={() => {
                this.props.showEmoji()
              }}
                background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} >
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30, marginBottom: 7 }}>

                { this.renderEmojieIcon() }

                </View>
              </TouchableNativeFeedback>

              : null
          }

          <View style={styles.container}>

            {showVoice
              ? <VoiceButton
                audioHasPermission={audioHasPermission}
                inputHeight={this.inputHeight}
                rootHeight={rootHeight}
                showVoice={showVoice}
                voiceStart={voiceStart}
                isVoiceEnd={isVoiceEnd}
                inputHeightFix={inputHeightFix}
                pressOutText={pressOutText}
                pressInText={pressInText}
                voiceEnd={voiceEnd}
                changeVoiceStatus={changeVoiceStatus}
              />
              : <>
                <Input
                  // enabled={enabled}
                  onFocus={onFocus}
                  placeholder={placeholder}
                  onContentSizeChange={onContentSizeChange}
                  textChange={textChange}
                  messageContent={messageContent}
                  inputHeightFix={inputHeightFix}
                  inputChangeSize={inputChangeSize}
                  inputStyle={inputStyle}
                />
              </>}

          </View>

          {messageContent.trim().length < 1 ? (
            <>
              <View style={{ flexDirection: 'row', alignSelf: "flex-end", marginBottom:6, marginRight: 6 }}>

                <TouchableNativeFeedback delayPressIn={0} onPress={() => {
                  // this.setState({ keyboadIsOpen: true })
                }}
                  background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} >
                  <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30, }}>


                    <View>
                      <Icon pack={'simpleline'} name={'camera'} size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
                    </View>


                  </View>
                </TouchableNativeFeedback>
                <View style={{ width: 10 }}></View>

                {
                  useVoice
                    ? <Voice
                      showVoice={showVoice}
                      ImageComponent={ImageComponent}
                      keyboardIcon={keyboardIcon}
                      voiceIcon={voiceIcon}
                      inputHeightFix={inputHeightFix}
                      onMethodChange={onMethodChange}
                    />
                    : null
                }


              </View>
            </>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' , marginBottom:6 }}>
              <TouchableNativeFeedback delayPressIn={0} onPress={() => {
                // this.setState({ keyboadIsOpen: true })
              }}
                background={TouchableNativeFeedback.Ripple('#c4c4c4', true)} >
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 30, width: 30, }}>
                  <View>
                    <Icon name={'attach-2-outline'} fill='#4b4b4c' size={25} style={{ height: 25, width: 25, color: '#4b4b4c' }} />
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}

        </View>
        <View style={{ flexDirection: 'row', alignSelf: "flex-end", marginBottom:4 }}>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#c4c4c4', true)}
            style={{ marginLeft: 8 }}
            onPress={
              () => {
                if (messageContent.trim().length > 0) {
                  onSubmitEditing('text', messageContent)
                } else {
                  if (usePlus) {
                    isShowPanel(!isPanelShow)
                  } else {
                    return null
                  }
                }
              }
            }
            activeOpacity={0.7}
          >
            <View style={{ backgroundColor: '#2D8CFF', alignItems:'center', justifyContent:'center', borderRadius: 100, height:40, width:40 }}>
              {this.renderIcon()}
            </View>
          </TouchableNativeFeedback>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  commentBar: {
    width: width,

    justifyContent: 'center',
    // borderColor: '#ccc',
    // borderTopWidth: StyleSheet.hairlineWidth
  },
  inputForm: {
    flexDirection: 'row',
    backgroundColor: '#EDF1F7',
    paddingVertical: 2,
    paddingLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: "flex-end",
    flex: 1,
  },
  container: {
    // marginHorizontal: 8,
    // borderRadius: 18,
    // borderColor: '#ccc',
    flex: 1,
    // borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 0.8,
    marginBottom: 2,
  },
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 20
  }
})
