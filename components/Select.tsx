import { borderRadius, colors, fontSize, spacing } from "@/constants/theme";
import { StyleSheet, Text, View, Modal, Pressable, FlatList } from "react-native";
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

    function handleChange(value: string){
        onValueChange(value);
        setModalVisible(false);
    }

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
                <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>

                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {label || "Selecione uma opção"}
                            </Text>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={20} color={colors.red} />
                            </Pressable>
                        </View>

                        <FlatList 
                            data={options}
                            keyExtractor={item => item.value}
                            renderItem={(item)=>(
                                <Pressable style={styles.optionItem} onPress={()=>handleChange(item.item.value)}>
                                    <Text style={[styles.optionText, item.item.value === selectedValue && styles.optionTextSelected]}>{item.item.label}</Text>
                                </Pressable>
                            )}
                        />
                    </View>

                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginBottom: spacing.sm,
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
    modalOverlay:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },
    modalContent:{
        backgroundColor: colors.background,
        width: '100%',
        maxHeight: '70%',
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: borderRadius.lg,
    },
    modalHeader:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    modalTitle:{
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: colors.primary,
    },
    optionItem:{
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    optionText:{
        color: colors.primary,
    },
    optionTextSelected:{
        fontWeight: 'bold',
        color: colors.green,
    }
});