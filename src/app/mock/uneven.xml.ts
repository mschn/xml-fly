export const uneven_xml = `
<array>
  <entry>
    <aaa></aaa>
  </entry>
  <entry>
    <bbb></bbb>
  </entry>
  <entry>
    <bbb></bbb>
    <aaa></aaa>
  </entry>
  <entry>
    <ccc></ccc>
  </entry>
</array>
`;

export const uneven_xml2 = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Actors>
  <Actor DateOfBirth="1970-03-10" ID="1" internal="zzz:1" type="adult" roles="person">
    <Name FirstName="TESTER" IsRef="true" LastName="TEST" Title="MR" Type="Person"/>
  </Actor>
  <Actor ID="2" DateOfBirth="2019-03-10" type="child" ref="1">
    <Name FirstName="BBY" IsRef="true" LastName="TEST" Type="Person"/>
    <Contact email="foo@test.com" Type="Document"/>
  </Actor>
  <Actor ID="3" internal="zzz:3" type="adult" DateOfBirth="2014-03-10" roles="person">
    <Contact Phone="123456" Type="Document"/>
    <Name FirstName="TWO" IsRef="true" LastName="TEST" Title="MR" Type="Person"/>
  </Actor>
  <Contact ID="c1" purpose="mailing"/>
</Actors>
`;
