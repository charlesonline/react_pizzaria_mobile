import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";
import {Feather} from '@expo/vector-icons';
import { useState } from "react";

interface SelectOptions{
    label: string;
    value: string;
}

interface SelectProps{
    label?: string;
    options: SelectOptions[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

export function Select({label, options, selectedValue, onValueChange, placeholder="Selecione..."}: SelectProps){
    const [modalVisible, setModalVisible] =  useState(false);

    return(
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable
                style={styles.selectButton}
                onPress={() => setModalVisible(true)} >

                <Text style={styles.selectText}>
                    {options.find(option => option.value === selectedValue)?.label || placeholder}
                </Text>
                <Feather name="chevron-down" size={20} color={colors.gray} />
                
            </Pressable>

            <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={()=>setModalVisible(false)}>
                <Text>Teste</Text>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    label:{
        color: colors.primary,
        fontSize: fontSize.md,
        marginBottom: spacing.sm,
        fontWeight: '600',
    },
    selectButton:{
        backgroundColor: colors.backgroundInput,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.borderColor,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: spacing.md,
    },
    selectText:{
        color: colors.primary,
        // fontSize: fontSize.md,
        flex: 1,
        textAlign: 'left',
    },
    placeholderText:{
        color: colors.gray,
    },
});