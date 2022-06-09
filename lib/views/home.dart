import 'package:fashiondao/models/accountmodel.dart';
import 'package:fashiondao/views/searchview.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'dashboard.dart';

class HomeView extends StatelessWidget {
  HomeView({Key? key, required this.account}) : super(key: key);
  HomeController controller = Get.put(HomeController());
  AccountModel account;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Column(
          children: [
            DrawerHeader(child: FlutterLogo()),
            SizedBox(
              height: 20,
            ),
            ListTile(
              onTap: () {
                controller.currentView.value = CurrentView.dashboard;
              },
              title: Text(describeEnum(CurrentView.dashboard)),
              trailing: Icon(Icons.dashboard),
            ),
            SizedBox(
              height: 20,
            ),
            ListTile(
              onTap: () {
                controller.currentView.value = CurrentView.search;
              },
              title: Text(describeEnum(CurrentView.search)),
              trailing: Icon(Icons.search),
            ),
          ],
        ),
      ),
      body: Obx(() {
        return controller.currentView.value == CurrentView.dashboard
            ? DashboardView()
            : SearchView();
      }),
    );
  }
}

enum CurrentView { dashboard, search }

class HomeController extends GetxController {
  Rx<CurrentView> currentView = CurrentView.dashboard.obs;
}
