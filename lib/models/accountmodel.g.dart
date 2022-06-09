// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'accountmodel.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class AccountModelAdapter extends TypeAdapter<AccountModel> {
  @override
  final int typeId = 0;

  @override
  AccountModel read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return AccountModel(
      accountId: fields[2] as String,
      privateKey: fields[1] as String,
      publickey: fields[0] as String,
    );
  }

  @override
  void write(BinaryWriter writer, AccountModel obj) {
    writer
      ..writeByte(3)
      ..writeByte(0)
      ..write(obj.publickey)
      ..writeByte(1)
      ..write(obj.privateKey)
      ..writeByte(2)
      ..write(obj.accountId);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is AccountModelAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
