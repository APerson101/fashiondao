import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';
part 'accountmodel.g.dart';

@HiveType(typeId: 0)
class AccountModel {
  @HiveField(0)
  String publickey;
  @HiveField(1)
  String privateKey;

  @HiveField(2)
  String accountId;

  AccountModel(
      {required this.accountId,
      required this.privateKey,
      required this.publickey});

  factory AccountModel.fromJSON(String map) =>
      AccountModel.fromMap(json.decode(map));

  factory AccountModel.fromMap(Map<String, dynamic> map) {
    return AccountModel(
      accountId: map['accountID'] ?? '',
      privateKey: map['privateKey'] ?? '',
      publickey: map['publicKey'] ?? '',
    );
  }
}
