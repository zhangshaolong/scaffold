<div id="car-id">
  car id: <div class="car-name">{{_this.id}}</div>
</div>

<div class="car-name">
  car name: {{_this.name}}
</div>

<div>
  car price: {{_this.price}}
</div>
<%
  let json = JSON.stringify(_this || {test: true});
%>
<c-module path="pages/road/list" querys='{{json}}'></c-module>

<div id="b">pages/road/detail{{json}}</div>
<c-module path="pages/road/detail" querys='{{json}}'></c-module>