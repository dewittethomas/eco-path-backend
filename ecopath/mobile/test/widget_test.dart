
import 'package:flutter_test/flutter_test.dart';
import 'package:ecopath/app.dart';


void main() {
  testWidgets('App loads smoke test', (WidgetTester tester) async {
    // Build the app
    await tester.pumpWidget(const EcoPathApp());

    // Verify app starts with bottom navigation
    expect(find.text('Dashboard'), findsOneWidget);
  });
}