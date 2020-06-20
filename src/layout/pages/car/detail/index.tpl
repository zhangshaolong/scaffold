<c-module path="pages/test-mock-proxy"></c-module>

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
  let a = {
    g: 'rrr'
  }
%>
<c-module path="pages/road/list" c-props="1212" id="cm"></c-module>

<div id="b">pages/road/detail{{json}}</div>
<c-module path="pages/road/detail"></c-module>

<div>custom module: <span id="custom-module" c-props={{
  JSON.stringify(a)
}}></span></div>