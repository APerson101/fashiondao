import 'package:fashiondao/models/accountmodel.dart';
import 'package:fashiondao/views/home.dart';
import 'package:fashiondao/views/signup.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(AccountModelAdapter());
  runApp(
    ProviderScope(child: MyApp()),
  );
}

class MyApp extends ConsumerWidget {
  MyApp({Key? key}) : super(key: key);
  final firstTimeUser =
      FutureProvider((ref) => Hive.box('accounts').length > 0);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(firstTimeUser).when(data: (bool data) {
      if (data) {
        // user has accounts already on the device, move to home screen
        late final accounts = Hive.box('accounts');
        return MaterialApp(
            home: Scaffold(
                body: HomeView(
          account: accounts.values.toList()[0],
        )));
      } else {
        return MaterialApp(home: Scaffold(body: LoginView()));
      }
    }, error: (Object error, StackTrace? stackTrace) {
      return const Scaffold(
          body: Center(
        child: Text("Unknown Error"),
      ));
    }, loading: () {
      return const MaterialApp(
          home: Scaffold(body: CircularProgressIndicator.adaptive()));
    });
  }
}
