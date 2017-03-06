<!DOCTYPE html>
<html>
	<head>
		<title>ZombieBox</title>
		<meta charset="utf-8">
		<script>CLOSURE_NO_DEPS=true;</script>
		<!-- styles -->
		<% if (styles.length) {
		print('<link rel="stylesheet" href="' + styles.join('">\n\t<link rel="stylesheet" href="') + '">');
		} %>
		<% if (inlineStyles.length) {
		print('<style>' + inlineStyles.join('</style>\n\t<style>') + '</style>');
		} %>
		<link rel="stylesheet" href="jslgvkeyboard/LgVKeyboard.css">
		<!-- scripts -->
		<% if (jsLibs.length) {
        print('<script>' + jsLibs.join('</script>\n\t<script>') + '</script>');
        } %>
		<% if (scripts.length) {
		print('<script src="' + scripts.join('"></script>\n\t<script src="') + '"></script>');
		} %>
		<% if (inlineScripts.length) {
		print('<script>' + inlineScripts.join('</script>\n\t<script>') + '</script>');
		} %>
		<script id="mainVKScript" src="jslgvkeyboard/LgVKeyboard.js"></script>
	</head>
	<body>
		<script type="text/javascript" src="$MANAGER_WIDGET/Common/IME_XT9/ime.js"></script>
	</body>
</html>
