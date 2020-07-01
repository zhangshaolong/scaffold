<div class="mock-proxy-container">
  <div>
    <button class="click" path="/mock-api/local">测试本地mock</button>
    <div></div>
  </div>

  <div>
    <button class="click" path="/local-proxy-api/remote">测试本地proxy</button>
    <div></div>
  </div>

  <div>
    <button class="click" path="/local-proxy-api/exclude">测试本地proxy的排除</button>
    <div></div>
  </div>

  <div>
    <button class="click" path="/start/middle-api/test">测试中间规则</button>
    <div></div>
  </div>

  <div>
    <button class="click" path="/api_v2/app/app_list/list">测试代理到slardar</button>
    <div></div>
  </div>

  <div>
    <button class="click" path="/api_v2/app/pro_dashboard/overview" params={{JSON.stringify({"aid":13,"os":"Android","region":"cn","days":30,"dimension":"build_version","without_cache":false})}}>测试代理到slardar /api_v2/app/pro_dashboard/overview</button>
    <div></div>
  </div>

  
</div>