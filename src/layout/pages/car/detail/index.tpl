<div id="car-id">
  car id: <div class="car-name">{{data.id}}</div>
</div>

<div class="car-name">
  car name: {{filter('aaa', data.name)}}
</div>

<div>
  car price: {{data.price}}
</div>
<%
  let json = JSON.stringify(data || {test: true});
%>
<c-module path="pages/road/list"></c-module>

<div id="b">pages/road/detail{{json}}</div>
<c-module path="pages/road/detail"></c-module>