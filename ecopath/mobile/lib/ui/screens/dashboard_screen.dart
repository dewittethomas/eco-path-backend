import 'package:flutter/material.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const _BlankPage();
  }
}

class _BlankPage extends StatelessWidget {
  const _BlankPage();

  @override
  Widget build(BuildContext context) {
    // intentionally blank to match the provided design
    return SizedBox.expand();
  }
}
