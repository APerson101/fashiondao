import 'package:cloud_functions/cloud_functions.dart';
import 'package:fashiondao/models/accountmodel.dart';
import 'package:fashiondao/views/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final accountProvider = FutureProvider((ref) async {
  FirebaseFunctions functions = FirebaseFunctions.instance;
  var result = await functions.httpsCallable('createAccount').call({});
  if (result.data == null) return null;
  return AccountModel.fromJSON(result.data);
});

class LoginView extends ConsumerWidget {
  const LoginView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Text(
            'Welcome to TData, the open source paltform for data sharing, taking advantage of the powerful Hedera Hashgraph ',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(
            height: 11,
          ),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => NewAccountView()));
              },
              child: Text("Create new Acccount"))
        ],
      ),
    );
  }
}

class NewAccountView extends ConsumerWidget {
  const NewAccountView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(accountProvider).when(data: (data) {
      if (data != null) {
        return displayNewAccount(context, data);
      }
      return Center(
        child: Text("Unknown Error"),
      );
    }, error: (Object error, StackTrace? stackTrace) {
      return Center(
        child: Text("Failed to load"),
      );
    }, loading: () {
      return Center(
        child: CircularProgressIndicator.adaptive(),
      );
    });
  }

  Widget displayNewAccount(BuildContext context, AccountModel newAccount) {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          ListTile(
            title: Text("Your Private Key"),
            subtitle: Text(newAccount.privateKey),
          ),
          SizedBox(
            height: 20,
          ),
          ListTile(
            title: Text("Your Public Key"),
            subtitle: Text(newAccount.publickey),
          ),
          SizedBox(
            height: 20,
          ),
          ListTile(
            title: Text("Your Account Id"),
            subtitle: Text(newAccount.accountId),
          ),
          SizedBox(
            height: 20,
          ),
          ElevatedButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => HomeView(account: newAccount)));
              },
              child: const Text("Continue to Dashboard"))
        ],
      ),
    );
  }
}
