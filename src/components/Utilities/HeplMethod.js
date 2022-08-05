import { check, checkMultiple, PERMISSIONS, RESULTS, request, requestMultiple, openSettings } from 'react-native-permissions'
import { Platform } from 'react-native'

export const PermissionCheck = async () => {
    var result = { "Result": true };
    if (Platform.OS === 'android') {
        await checkMultiple([
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
                    PERMISSIONS.ANDROID.CAMERA, 
                    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
                ]
                ).then((statuses) => {
            switch (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
                case RESULTS.GRANTED:
                    result = { ...result, "FINE_LOCATION": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "FINE_LOCATION": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.CAMERA]) {
                case RESULTS.GRANTED:
                    result = { ...result, "CAMERA": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "CAMERA": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "WRITE_EXTERNAL_STORAGE": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "WRITE_EXTERNAL_STORAGE": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "READ_EXTERNAL_STORAGE": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "READ_EXTERNAL_STORAGE": {"USE" :false}, "Result": false }
                    break;
            }
        }).catch((ex) => {
            console.log(ex)
        })
    }
    else if (Platform.OS === 'ios') {
        await checkMultiple([
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, 
                PERMISSIONS.IOS.CAMERA, 
                PERMISSIONS.IOS.MICROPHONE,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
                PERMISSIONS.IOS.MEDIA_LIBRARY
            ]).then((statuses) => {
            switch (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "LOCATION_WHEN_IN_USE": {"USE" :true} }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "LOCATION_WHEN_IN_USE": {"USE" :false, "UNAVAILABLE": true} }
                    break;
                default:
                    result = { ...result, "LOCATION_WHEN_IN_USE": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.CAMERA]) {
                case RESULTS.GRANTED:
                    result = { ...result, "CAMERA": {"USE" :true} }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "CAMERA": {"USE" :false, "UNAVAILABLE": true}  }
                default:
                    result = { ...result, "CAMERA": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.MICROPHONE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "MICROPHONE": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "MICROPHONE": {"USE" :false, "UNAVAILABLE": true} }
                default:
                    result = { ...result, "MICROPHONE": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "PHOTO_LIBRARY": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "PHOTO_LIBRARY": {"USE" :false, "UNAVAILABLE": true} }
                default:
                    result = { ...result, "PHOTO_LIBRARY": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": {"USE" :false, "UNAVAILABLE": true} }
                default:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": {"USE" :false}, "Result": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "MEDIA_LIBRARY": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "MEDIA_LIBRARY": {"USE" :false, "UNAVAILABLE": true} }
                default:
                    result = { ...result, "MEDIA_LIBRARY": {"USE" :false}, "Result": false }
                    break;
            }
        }).catch((ex) => {
            console.log(ex)
        })
    }
    return result;
}

export const PermissionRequest = async () => {
    var result = {};
    if (Platform.OS === 'android') {
        await requestMultiple([
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, 
                PERMISSIONS.ANDROID.CAMERA, 
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
            ]).then((statuses) => {
            switch (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]) {
                case RESULTS.GRANTED:
                    result = { ...result, "FINE_LOCATION": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "FINE_LOCATION": {"USE" :false} }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.CAMERA]) {
                case RESULTS.GRANTED:
                    result = { ...result, "CAMERA": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "CAMERA": {"USE" :false} }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "WRITE_EXTERNAL_STORAGE": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "WRITE_EXTERNAL_STORAGE": {"USE" :false} }
                    break;
            }

            switch (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "READ_EXTERNAL_STORAGE": {"USE" :true} }
                    break;
                default:
                    result = { ...result, "READ_EXTERNAL_STORAGE": {"USE" :false} }
                    break;
            }
        }).catch((ex) => {
            console.log(ex)
        })
    }
    else if (Platform.OS === 'ios') {
        await requestMultiple([
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, 
                PERMISSIONS.IOS.CAMERA,
                PERMISSIONS.IOS.MICROPHONE,
                PERMISSIONS.IOS.PHOTO_LIBRARY,
                PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
                PERMISSIONS.IOS.MEDIA_LIBRARY
            ]).then((statuses) => {
            switch (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "LOCATION_WHEN_IN_USE": true }
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "LOCATION_WHEN_IN_USE": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "LOCATION_WHEN_IN_USE": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.CAMERA]) {
                case RESULTS.GRANTED:
                    result = { ...result, "CAMERA": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "CAMERA": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "CAMERA": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.MICROPHONE]) {
                case RESULTS.GRANTED:
                    result = { ...result, "MICROPHONE": true }
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "MICROPHONE": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "MICROPHONE": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "PHOTO_LIBRARY": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "PHOTO_LIBRARY": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "PHOTO_LIBRARY": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": true }
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "PHOTO_LIBRARY_ADD_ONLY": false }
                    break;
            }

            switch (statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]) {
                case RESULTS.GRANTED:
                    result = { ...result, "MEDIA_LIBRARY": true }
                    break;
                case RESULTS.UNAVAILABLE:
                    result = { ...result, "MEDIA_LIBRARY": false, "UNAVAILABLE": true }
                    break;
                default:
                    result = { ...result, "MEDIA_LIBRARY": false }
                    break;
            }
        }).catch((ex) => {
            console.log(ex)
        })
    }

    return result;
}

export const PermissionCheckCustom = async (permissions) => {
    var result = false
    await check(permissions).then((status) => {
        switch (status) {
            case RESULTS.GRANTED:
                result = true;
                break;
            default:
                result = false;
                break;
        }
    }).catch((ex) => {
        result = false;
    })
    return result
}

export const DateFormat = (date) => {
    var dateTime = new Date(date);
    var dateDay = String(dateTime.getDate()).padStart(2, '0')
    var dateMonth = (dateTime.getMonth() + 1).toString().padStart(2, '0')
    var dateYear = dateTime.getFullYear()
    var result = dateDay + '/' + dateMonth + '/' + dateYear;
    return result;
}

export const HourMinute = (date) => {
    var dateTime = new Date(date)
    var hour = String(dateTime.getHours()).padStart(2, '0')
    var minute = String(dateTime.getMinutes()).padStart(2, '0')
    return hour + ':' + minute
}

export const TurkishShortMonth = (date) => {
    var dateTime = new Date(date)
    var monthNumber = dateTime.getMonth() + 1
    var montName = 'OCA'
    switch (monthNumber) {
        case 1:
            montName = 'OCA'
            break;
        case 2:
            montName = 'ŞUB'
            break;
        case 3:
            montName = 'MAR'
            break;
        case 4:
            montName = 'NİS'
            break;
        case 5:
            montName = 'MAY'
            break;
        case 6:
            montName = 'HAZ'
            break;
        case 7:
            montName = 'TEM'
            break;
        case 8:
            montName = 'AĞU'
            break;
        case 9:
            montName = 'EYL'
            break;
        case 10:
            montName = 'EKİ'
            break;
        case 11:
            montName = 'KAS'
            break;
        case 12:
            montName = 'ARA'
            break;
    }

    return montName;
}