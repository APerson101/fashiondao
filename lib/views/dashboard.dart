import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DashboardView extends StatelessWidget {
  DashboardView({Key? key, required this.isUserNew}) : super(key: key);
  DashboardController controller = Get.put(DashboardController());
  bool isUserNew;
  @override
  Widget build(BuildContext context) {
    return isUserNew ? newUserView(context) : returningUser();
  }

  Widget newUserView(BuildContext context) {
    return Center(
        child: ElevatedButton(
            onPressed: () {
              Get.defaultDialog(
                  title: 'Create Company',
                  content: SizedBox(
                    width: MediaQuery.of(context).size.width > 200
                        ? MediaQuery.of(context).size.width * 0.5
                        : MediaQuery.of(context).size.width,
                    height: MediaQuery.of(context).size.height,
                    child: SingleChildScrollView(
                      child: Column(
                        children: [
                          TextField(
                            onChanged: (name) =>
                                controller.newCompmany.value = name,
                            decoration: InputDecoration(
                                hintText: 'Enter company name',
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(20))),
                          ),
                          TextField(
                            onChanged: (name) =>
                                controller.supplies.value = name,
                            decoration: InputDecoration(
                                hintText: 'Enter number of suppliers',
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(20))),
                          ),
                          ...suppliers(),
                          TextField(
                            onChanged: (name) =>
                                controller.facilities.value = name,
                            decoration: InputDecoration(
                                hintText: 'Enter number of facilites',
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(20))),
                          ),
                          ...facilities(),
                          ElevatedButton(
                              onPressed: () async {
                                await controller.save();
                              },
                              child: const Text("Save"))
                        ],
                      ),
                    ),
                  ));
            },
            child: const Text("Create Comany")));
  }

  Widget returningUser() {
    return Center(
      child: Text("WELCOME BACK"),
    );
  }

  List<Widget> suppliers() {
    RxList<Widget> all = <Widget>[].obs;
    ObxValue((RxInt number){
 for (var i = 0; i < controller.supplies.value; i++) {
      all.add(ListTile(
        title: TextField(
          onChanged: (name) => controller.suppliernames[i].value = name,
          decoration: InputDecoration(hintText: 'Enter supplier name'),
        ),
      ));
    }, controller.supplies);
   
    }

    return all;
  }

  List<Widget> facilities() {
    RxList<Widget> all = <Widget>[].obs;
    for (var i = 0; i < controller.facilities.value; i++) {
      all.add(ListTile(
        title: TextField(
          onChanged: (name) => controller.facilitiesNames[i].value = name,
          decoration: InputDecoration(hintText: 'Enter facility name'),
        ),
        subtitle: TextField(
          onChanged: (name) => controller.facilitiesEmission[i].value = name,
          decoration:
              InputDecoration(hintText: 'Enter facility emission if available'),
        ),
      ));
    }

    return all;
  }
}

class DashboardController extends GetxController {
  RxString newCompmany = ''.obs;
  RxInt supplies = 0.obs;
  RxList<String> suppliernames =List.filled(supplies.value, "") <String>[].obs;
}
